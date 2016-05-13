//奖品
var data=['Phone5','Ipad','三星笔记本','佳能相机','惠普打印机','谢谢参与','50元充值卡','1000元超市购物券'];
//定时器
var timer=null;
//一个标志：确定键盘是否已经被点击
var flag=0;

window.onload=function(){
  //获取节点
  var play=document.getElementById('play');
  var stop=document.getElementById('stop');

  //鼠标点击事件
  play.onclick=playFun;
  stop.onclick=stopFun;

  //键盘事件
  document.onkeyup=function(event){
    //（浏览器兼容性）
    event = event || window.event;
    //“enter”键的KeyCode是13
    if(event.keyCode==13){
      //flag==0：没有按过
      if(flag==0){
        playFun();
        flag=1;
      }else{
        stopFun();
        flag=0;
      }
    }
  }
}

//启动摇奖
function playFun(){
	var title=document.getElementById('title');
	var play=document.getElementById('play');
  //每次启动前先清除Interval，保证Interval不被重复调用
	clearInterval(timer);
	timer=setInterval(function(){
	   var random=Math.floor(Math.random()*data.length);
	   title.innerHTML=data[random];
	},50);
  play.style.background='#999';
}
//停止摇奖
function stopFun(){
	clearInterval(timer);
	var play=document.getElementById('play');
	play.style.background='#036';
}