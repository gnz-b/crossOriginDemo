const http = require('http');
const url = require('url');
const data = 'Hey I am server side';

http.createServer(function(req, res) {
	const params = url.parse(req.url, true);
	if (params.query.callback){
		console.log('params:', params);
		const result = params.query.callback + '("' + data +'")';
		res.write(result);
		res.end();
	} else {
		console.log('recevie the request from', req.url);
		res.writeHead(200, {'Content-type': 'text/plain'});
		res.write(data);
		res.end();
	}

}).listen(8888, function() {
	console.log('server listen on the port 8888');
});
