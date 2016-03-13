//当点击“myButton”时，调用transform（）；
document.getElementById('myButton').onclick = function(){transform()};

//将输入的字符串整理为可供输出的字符串,并输出
function transform() {
	//将输入字符串赋值给inputInterests；
	var inputInterests = document.getElementById('inputInterest').value；

	//该函数将输入的字符串整理为可供输出的字符串
	function arraytransform(inputString) {
		array = inputString.split(",");
		/*var outputArray = new Array();
		for (var i = 0; i < array.length; i++){
			if (array[i] != null) {
				outputArray[i] = array[i];
			}
		}*/
		return array;
	}

	//应用函数，并输出
	outputInterests = arraytransform(inputInterests);
	var x = document.getElementById('outputInterest');
	x.innerHTML = outputInterests;
}