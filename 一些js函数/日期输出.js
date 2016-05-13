//输出今天的日期，以YYYY-MM-DD的方式，比如今天是2014年9月26日，则输出2014-09-26

var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
month = (month < 10) ? "0" + month : month;
var day = d.getDate();
day = (day < 10) ? "0" + day : day;

alter(year + "-" + month + "-" + day);