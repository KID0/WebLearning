window.onload = init;

function init() {
	var button = document.getElementById("addButton");
	button.onclick = handleButtonClick;
	loadPlaylist();
}

function handleButtonClick() {
	var songName = document.getElementById("songTextInput").value;
	var li = document.createElement("li");
	li.innerHTML = songName;
	var ul = document.getElementById("playlist");
	ul.appendChild(li);
	save(songName);
}


