//join()函数;
var stringArray = [“This”, “is”, “Baidu”, “Campus”]；
//将数组中的各项用一个空格连接起来;
stringArray.join(“ ”)；
//输出：”This is Baidu Campus”;


//判断是否是数组
var arr = []; 
arr instanceof Array; // true 
arr.constructor == Array; //true 




//驼峰表示法转换:"get-element-by-id"-->"getElementById";
function combo(msg) {
	var arr = msg.split("-");
	//从第二个字符串（index == 1）开始，首字母大写；
	for (var i = 1; i < arr.length; i++) {
		//substr(a,b):取a,b之间的字符；
		arr[i] = arr[i].charAt(0).toUpperCase()+arr[i].substr(1,arr[i].length - 1);
	}
	msg = arr.join("");
	return msg;
}



//数组排序
//倒序排列
arrayObject.reverse()
//arrayObject.sort(sortby)
//sortby:一个排序函数

function sortNumber(a, b) {
	return a - b;
	//如果想要倒序，变为 "return b - a"即可；
}
var arr = [10,5,40,25,1000,1];
arr.sort(sortNumber);
//arr == [1,5,10,25,40,1000];
arr.sort();
//arr == [1,10,1000,25,40,5];


//把两个数组合并，并删除第二个元素；
var array1 = ['a','b','c'];
var bArray = ['d','e','f'];
var cArray = array1.concat(bArray);
//从index为1的地方删除，删除一个元素；
cArray.splice(1,1);