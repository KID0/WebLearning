//获取到页面中所有的checkbox

var domList = document.getElementsByTagName('input');
var checkBoxList = [];
var len = domList.length;

while (len--){
	if (domList[len].type == "checkbox") {
		checkBoxList.push(domList[len]);
	}
}