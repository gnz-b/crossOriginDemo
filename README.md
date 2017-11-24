# cross-origin demo(跨域)

#### 为了加深对跨域问题的理解以及XMLHttpRequest的使用,写了一个简单的跨域问题的实验.


>首先安装依赖
```
npm install
```

>启动本地的服务端，用nodejs写了一个监听端口**8888**的http服务端。
```
npm run server
```
>打开客户端，webpack dev server启动了一个在端口**10114**上的客户端。

```
npm start
```

根据**同源政策**

>1. 协议 
>2. 域名 
>3. 端口 

 三者都相同时才符合同源, 不然会有跨域问题
 
 当在端口10114上的客户端去请求也在本地8888端口的服务端的时候,就会有跨域问题.

点击网页上第一个button(通过XMLHttpRequest直接请求localhost:8888), 此时浏览器会报跨域的错误.

```javascript
const xhr = new XMLHttpRequest();
// 注册监听readyState变化的function
xhr.onreadystatechange = function() {
  // readyState 请求/响应过程的当前活动阶段
  // 值为4表示完成，已接收到全部响应数据
  if(xhr.readyState === 4) {
    const status = xhr.status;
    // http请求的状态码 2开头的都是成功的
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
```

点击第二个button发送了一个jsonp类型的请求,就能正常接收到请求的返回值.

平时碰到跨域问题的话, 一般使用请求类型为jsonp的ajax来解决问题.jsonp本质上是利用了script标签可以跨域访问资源的特性, 动态的添加了一段script的元素.该元素的src就是请求的服务端的url和一个callback的参数, callback的值是个函数用来接收服务端返回的参数.

在服务端代码中需要对callback惨进行特殊处理, 否则无法调用callback函数.
```javascript
const params = url.parse(req.url, true);
if (params.query.callback){
    console.log('params:', params);
    const result = params.query.callback + '("' + data +'")';
    res.write(result);
    res.end();
}
```






