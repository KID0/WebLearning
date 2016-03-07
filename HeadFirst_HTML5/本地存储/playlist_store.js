//以下注释可能有大量错误
//JSON，一种数据格式，类似于{key：value}
//JSON 语法是 JavaScript 语法的子集，没什么特殊的

function save(item) {
	var playlistArray = getStoreArray("playlist");
	//从JSON格式数组“playlist”获取数据并赋值给playlistArray
	playlistArray.push(item);//将“item”压进“playlistArray”
	localStorage.setItem("playlist",JSON.stringify(playlistArray));
	//将playlistArray中的数据以JSON格式存储到“playlist”中
}

function loadPlaylist() {
	var playlistArray = getSavedSongs();//从JSON格式数组“playlist”获取数据
	//将JSON格式数组“playlist”中的数据添加进网页列表“playlist”中
	var ul = document.getElementById("playlist");
	if (playlistArray != null) {
		for (var i = 0; i < playlistArray.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = playlistArray[i];
			ul.appendChild(li);
		}
	}
}

function getSavedSongs() {
	return getStoreArray("playlist");//从JSON格式数组“playlist”获取数据
}

function getStoreArray(key) {//将本地存储的数据以JSON格式返回
//localStorage是HRML5自带方法，用于本地存储，空间为5MB
	var playlistArray = localStorage.getItem(key);
	//获取全部数据（这些数据以JSON格式存储），并赋值给playlistArray
	if (playlistArray == null || playlistArray == "") {
		playlistArray = new Array();
	}
	else {
		playlistArray = JSON.parse(playlistArray);
		//如果kay中有数据，那就以JSON形式取出来，并且返回
	}
	return playlistArray;
}
//parse用于从一个字符串中解析出json对象
//stringify()用于从一个对象解析出字符串
//对象可以正常使用DOM