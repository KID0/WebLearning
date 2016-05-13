//将字符串”<tr><td>{$id}</td><td>{$name}</td></tr>”中的
//{$id}替换成10，{$name}替换成Tony；

var str = "<tr><td>{$id}</td><td>{$id}_{$name}</td></tr>";
//g表示全局匹配；
str.replace(/{\$id}/g, "10").replace(/{\$name}/g, "Tony");

//字符转义
function escapeHtml(str) {
return str.replace(/[<>”&]/g, function(str) {
    switch (str) {
                   case “<”:
                      return “&lt;”;
                   case “>”:
                      return “&gt;”;
                   case “&”:
                      return “&amp;”;
                   case “\””:
                      return “&quot;”;
      }
  });
}




//邮箱的正则匹配：
var regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;