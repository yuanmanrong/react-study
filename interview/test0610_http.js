// 计算机原理知识：url整个过程、http/https、tcp/udp滑动窗口，浏览器强缓存和协商缓存、options、cdn、mdn、

/* 
options：可以获取目的资源支持的通信选项
监测服务器支持的请求方法
浏览器的CORS（跨域资源共享）机制的非简单请求会触发预检请求，请求头，根据响应头进行规则判断，符合规则发送真正的请求，不符合浏览器会报错
*/
/* 
Content-Type：用于向接收方说明传输资源的媒体类型(MIME)。包含三个指令：MIME，charset,boundary
application/x-www-form-urlencoded  表单form默认的格式 发送前所有字符都会会进行编码  ASCII 
multipart/form-data 表单 使用文件上传使用该类型（因为文件是二进制）
两种表单媒体类型的区别：表单有一个enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。
encodeURIComponent和encodeURI区别: URI 引入了编码机制，将所有非 ASCII 码字符和界定符转为十六进制字节值，然后在前面加个%。
encodeURI是不会对url的一些预留字符进行编码,  都不会对!*()'进行编码.
text/plain ：纯文本 空格变加号，不对特殊字符编码
常见类型：
文本：text/plain、text/html、text/css、text/javascript、text/xml
图片：image/gif、image/png、image/jpeg
音频：audio/ogg、audio/wav
视频：video/webm、video/ogg
二进制：application/octet-stream、application/pdf、application/json  (application表示可执行可解析的二进制数据)
 */

/* 
http1.1 协商缓存缓存 长连接
http2.0 二进制（之前是基于文本协议） 多路复用 头部压缩 服务端推送
长连接和多路复用的区别：文本/流，按顺序|可以同时处理多个请求，
http和https：多了个ssl/tls的安全套接层 加密+认证+完整性
https加密原理：
对称加密，非对称加密  数字证书认证
*/
// 强缓存可以关吗？???
/* 
tcp/udp：
tcp是一种面向连接的、可靠的（流量控制和拥塞控制）、一对一的，基于字节流的传输层通信协议。
udp:无连接，不可靠，首部开销小，面向报文
*/
/* 
JWT原理就是服务器认证后返回一个json对象
*/

/* 
网络攻击：
xss：跨站脚本攻击 cross site script
csrf攻击:跨站请求伪造 Cross Site Request Forgery
*/

/* 
https://blog.csdn.net/fish_skyyyy/article/details/119676362
浏览器缓存：DNS缓存、HTTP缓存、CDN缓存
HTTP缓存：强缓存（disk cache和memory cache）： expires cache-control
协商缓存
流程：请求先去检查该缓存资源的header信息 ==》是否命中强缓存,命中就去内存中找资源  ==》 没有命中就发请求到服务器  ===》 协商缓存，返回资源
CDN缓存: 内容分发网络
*/

/* 
cookie: 4kb 状态存储 cookie不可跨域
属性：name/value/secure/httpOnly/domian/path
secure: true时只会在https,ssl安全协议下传输
httpOnly:防止xss攻击
domain:cookie绑定的域名，子域名的cookie也是不公用的
path:路由匹配，给匹配的路由绑定cookie
*/

/* 
跨域解决方案：https://juejin.cn/post/6844903767226351623
同源策略的限制：cookie/dom/ajax请求不能获取
支持跨域获取资源的标签：img link script
跨域问题：CORS、JSONP、postMessage(可以解决窗口之间，和嵌套的iframe)、iframe相关跨域
XMLHttpRequest遵循同源策略，但是script标签可以通过src填上目标地址发送get请求
*/
function myJsonp(url, cb) {
    let script = document.createElement("script")
    script.src = `${url}&callback=${cb}`
    document.body.appendChild(script)
    // window[cb] = function(data){
    //    console.log(data);
    //    document.body.removeChild(script)
    //    delete window[cb]
    // }
    return new Promise((resolve, reject) => {
        window[cb] = function (data) {
            console.log(data);
            resolve(data)
            document.body.removeChild(script)
            delete window[cb]
        }
    })
}

function cb(data) {
    console.log(data, "----");
}