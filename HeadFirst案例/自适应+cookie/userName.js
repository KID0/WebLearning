//一个全局变量
var userName;

//重新调整iRock的大小
function resizeRock() {
  document.getElementById("rockImg").style.height = (document.body.clientHeight - 100) * 0.9;
}

//用户欢迎信息
function greetUser() {
  //如果cookie可以使用，将userName读出来然后使用
  if (navigator.cookieEnabled)
    userName = readCookie("irock_username");
  if (userName)
    alert("Hello " + userName + ", I missed you.");
  else
    alert('Hello, I am your pet rock.');
}

//点击图片后发生的变化
function touchRock() {
  if (userName) {
    alert("I like the attention, " + userName + ". Thank you.");
  }
  else {
    //如果没有userName，那么就输入一个
    userName = prompt("What is your name?", "Enter your name here.");
    if (userName) {
      alert("It is good to meet you, " + userName + ".");
      //将userName保存到cookie
      if (navigator.cookieEnabled)
        writeCookie("irock_username", userName, 5 * 365);
      else
        alert("Cookies aren't supported/enabled in your browser, which means I won't remember you later. I'm sorry.");
    }
  }
  //更改图片
  document.getElementById("rockImg").src = "rock_happy.png";
  //每隔五分钟重新变回苦逼脸
  setTimeout("document.getElementById('rockImg').src = 'rock.png';", 5 * 60 * 1000);
}