//写入Cookie
function writeCookie(name, value, days) {
  //默认情况下没有截止日期，所以Cookie无法保持
  var expires = "";

  //实参days设置一个截止日期
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }

  //对cookie的格式不是很懂，对其进行操作比较麻烦
  //设置了一个cookie的名称，截止日期，路径
  document.cookie = name + "=" + value + expires + "; path=/";
}

//读出Cookie
function readCookie(name) {

  var searchName = name + "=";
  var cookies = document.cookie.split(';');
  for(var i=0; i < cookies.length; i++) {
    //这里是一个局部变量
    var c = cookies[i];
    //去除头部的所有空格
    while (c.charAt(0) == ' ')
      c = c.substring(1, c.length);
    //indexOf()：检索字符串中的指定字符
      //没有出现：-1
      //出现了：0
    if (c.indexOf(searchName) == 0)
      //取出“name=”后面的字符串（值）
      return c.substring(searchName.length, c.length);
  }
  //如果没有找到返回空值
  return null;
}
//擦出Cookie
function eraseCookie(name) {
  writeCookie(name, "", -1);
}
