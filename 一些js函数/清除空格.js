//清除字符串前后的空格（兼容所有浏览器）

//如果trim方法不存在，则定义一个trim方法；
if (!String.prototype.trim) {
	String.prototype.trim = function(){
		//"\s"空白字符
		return this.replace(/^\s+/,"").replace(/\s+$/,"");
	}
}
//使用该方法；
str.trim();