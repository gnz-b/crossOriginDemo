# cross-origin demo(跨域)

### 为了加深对跨域问题的理解以及XMLHttpRequest的使用,写了一个简单的跨域问题的实验.

启动本地的服务端，用nodejs启动了一个监听8888端口的http服务端。
```
    npm run server
```
启动客户端，webpack dev server启动了一个在端口10114上的客户端。

```
	npm start

```

根据同源政策（1. 协议 2.域名 3.端口, 三者都相同时才符合同源, 不然会有跨域问题), 当在端口10114上的客户端去请求也在本地8888端口的服务端的时候,就会有跨域问题.

点击网页上第一个发送请求的button(通过XMLHttpRequest实现), 此时浏览器会报跨域的错误.

平时碰到跨域问题的话, 一般使用请求类型为jsonp的ajax来解决问题.jsonp本质上是利用了script标签可以跨域访问资源的特性, 动态的添加了一段script的元素.该元素的src就是请求的服务端的url和一个callback的参数, callback的值是个函数用来接收服务端返回的参数.
点击第二个button就是发送了一个jsonp的请求.



