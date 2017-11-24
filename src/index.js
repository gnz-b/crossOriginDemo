function createHeader() {
    const header = document.createElement('h2');
    header.innerHTML = 'hello cross origin';
    return header;
}

function sendJsonp() {
	// 生成一个script tag
	const head = document.getElementsByTagName('head')[0];
	const script = document.createElement('script');
	script.src = 'http://localhost:8888?callback=pp';
	head.appendChild(script);
	window['pp'] = function pp(data) {
		head.removeChild(script);
		clearTimeout(script.timer);
		console.log('get the data:',data);
		window['pp'] = null;
	}
}

// 通过xmlHttpRequest 发送普通请求
function sendNormalRequest() {
	const xhr = new XMLHttpRequest();
	// 注册监听readyState值变化的function
    xhr.onreadystatechange = function() {
		// readyState 请求/响应过程的当前活动阶段
        // 值为4表示完成，已接收到全部响应数据
		if(xhr.readyState === 4) {
			const status = xhr.status;
			// http状态码 2开头的都是成功的
			if(status >= 200 && status < 300) {
				let response = '';
				const type = xhr.getResponseHeader('Content-type');
				if(type.indexOf('xml') > -1 && xhr.responseXML) {
					response = xhr.responseXML;
				} else if (type === 'application/json') {
					response = JSON.parse(xhr.responseText);
				} else {
					response = xhr.responseText;
				}
				// 输出接口获取的值
				console.log('get the response: ', response);
			} else {
				alert('opps! Something is wrong.');
			}
		}
	}
	xhr.open('GET', 'localhost:8888', true);
	xhr.send(null);
}

function createButton(buttonHtml, requestFn) {
	const button = document.createElement('button');
	button.innerHTML = buttonHtml;
	button.addEventListener('click', () => {requestFn()});
	return button;
}

document.body.appendChild(createHeader());
document.body.appendChild(createButton('发送正常请求(有跨域问题)',sendNormalRequest));
document.body.appendChild(createButton('JSONP请求', sendJsonp));
