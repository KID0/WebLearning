// AjaxRequest object constructor
// 这个函数注意到了浏览器兼容性
function AjaxRequest() {
  // Try the XMLHttpRequest object first
  // XMLHttpRequest 对象，用于在后台与服务器交换数据
  if (window.XMLHttpRequest) {
    try {
      this.request = new XMLHttpRequest();
    } 
    // 如果发生错误
    catch(e) {
      this.request = null;
    }
  // Now try the ActiveX (IE) version
  // 标准用法
  // IE真麻烦
  // 判断浏览器是否支持ActiveX控件
  } else if (window.ActiveXObject) {
    try {
      // 这是老版本ActiveX的语法
      this.request = new ActiveXObject("Msxml2.XMLHTTP");
    // Try the older ActiveX object for older versions of IE
    } 
    catch(e) {
      try {
        this.request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        this.request = null;
      }
    }
  }

  // If the request creation failed, notify the user
  // 如果request失败，提示用户
  if (this.request == null)
    alert("Ajax error creating the request.\n" + "Details: " + e);
}

// Send an Ajax request to the server
// 为AjaxRequest绑定方法
// 各种看不懂~
AjaxRequest.prototype.send = function(type, url, handler, postDataType, postData) {
  // 需要js异步请求的时候，把上一次的的请求取消
  if (this.request != null) {
    // Kill the previous request
    this.request.abort();

    // Tack on a dummy parameter to override browser caching
    // 没看懂，覆盖浏览器缓存？
    url += "?dummy=" + new Date().getTime();

    try {
      // 每当 readyState 改变时，就会触发 onreadystatechange 事件——“handler”
      /*
      readyState：存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
                  0: 请求未初始化
                  1: 服务器连接已建立
                  2: 请求已接收
                  3: 请求处理中
                  4: 请求已完成，且响应已就绪
      */
      this.request.onreadystatechange = handler;
      /*
      如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 open() 和 send() 方法：
                  open(method,url,async) 规定请求的类型、URL 以及是否异步处理请求。
                  send(string)  将请求发送到服务器。
      */
      this.request.open(type, url, true); // always asynchronous (true)
      if (type.toLowerCase() == "get") {
        // Send a GET request; no data involved
        // 只发送get请求，不需要向后台发送数据，所以send(null)
        this.request.send(null);
      } else {
        // Send a POST request; the last argument is data
        // setRequestHeader()为post方式需要追加的
        // “请求头”信息：规定在这里放置一些客户端（浏览器）的信息，以便服务器识别
        this.request.setRequestHeader("Content-Type", postDataType);
        this.request.send(postData);
      }
    } catch(e) {
      alert("Ajax error communicating with the server.\n" + "Details: " + e);
    }
  }
}


// 下面都是返回值
AjaxRequest.prototype.getReadyState = function() {
  return this.request.readyState;
}

AjaxRequest.prototype.getStatus = function() {
  return this.request.status;
}

AjaxRequest.prototype.getResponseText = function() {
  return this.request.responseText;
}

AjaxRequest.prototype.getResponseXML = function() {
  return this.request.responseXML;
}
