//JSON，一种数据格式，类似于{key：value}
//JSON 语法是 JavaScript 语法的子集，没什么特殊的
//json有两种结构，对象{}和数组[]，可嵌套{key:[value1，value2]}
//HTML5本地存储只能存字符串，任何格式存储的时候都会被自动转为字符串，所以读取的时候，需要自己进行类型的转换

function save(item) {
	var playlistArray = getStoreArray("playlist");
	//从JSON格式数组“playlist”获取数据并赋值给playlistArray
	playlistArray.push(item);//将“item”压进“playlistArray”
	localStorage.setItem("playlist",JSON.stringify(playlistArray));
	//将playlistArray中的数据以字符串形式存储到“playlist”中
	//stringify()用于从一个对象解析出字符串
}

function loadPlaylist() {
	//将JSON格式数组“playlist”中的数据添加进网页列表“playlist”中
	var playlistArray = getSavedSongs();//从JSON格式数组“playlist”获取数据
	var ul = document.getElementById("playlist");
	//如果数组内容不为空，则输出到列表中
	if (playlistArray != null) {
		for (var i = 0; i < playlistArray.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = playlistArray[i];
			ul.appendChild(li);
		}
	}
}

function getSavedSongs() {
	return getStoreArray("playlist");//获取JSON格式数据“playlist”
}

function getStoreArray(key) {//将本地存储的数据以JSON格式返回
//localStorage是HRML5自带方法，用于本地存储，空间为5MB
	var playlistArray = localStorage.getItem(key);
	//获取全部数据（这些数据以字符串格式存储），并赋值给playlistArray
	if (playlistArray == null || playlistArray == "") {
		playlistArray = new Array();
	}
	else {
		playlistArray = JSON.parse(playlistArray);
		//如果kay中有数据，那就以JSON对象取出来，并且返回
		//parse用于从一个字符串中解析出json对象
	}
	return playlistArray;//其实就是一个数组
}
//parse用于从一个字符串中解析出json对象
//stringify()用于从一个对象解析出字符串