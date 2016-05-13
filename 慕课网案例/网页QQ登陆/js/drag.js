// 得到某个parent下的所有clsName，打包进一个eles数组
// 此函数意义不明：或许因为某些浏览器不支持“document.getElementById”
function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload=drag;

function drag(){
  // 只能在logo附近拖曳
  var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
  // 为oTitle的onmousedown方法绑定一个fnDown函数
  oTitle.onmousedown=fnDown;
  // 取得关闭按钮
  var oClose=document.getElementById('ui_boxyClose');
  oClose.onclick=function(){
  document.getElementById('loginPanel').style.display='none';
  }
  // 切换状态
  var loginState=document.getElementById('loginState'),
      stateList=document.getElementById('loginStatePanel'),
      lis=stateList.getElementsByTagName('li'),
      stateTxt=document.getElementById('login2qq_state_txt'),
      loginStateShow=document.getElementById('loginStateShow');

  // 如果点击loginState：出现list，阻止冒泡
  loginState.onclick=function(e){
    e = e || window.event;
   if(e.stopPropagation){
        e.stopPropagation();
   }else{
        e.cancelBubble=true;
   }
 	 stateList.style.display='block';
 }

 // 鼠标滑过、离开和点击状态列表时
  for(var i=0,l=lis.length;i<l;i++){
    lis[i].onmouseover=function(){
    	this.style.background='#567';
    }
    lis[i].onmouseout=function(){
    	this.style.background='#FFF';
    }
    lis[i].onclick=function(e){

    	e = e || window.event;
    	if(e.stopPropagation){
        e.stopPropagation();
    	}else{
        e.cancelBubble=true;
    	}

    	var id=this.id;
      // 隐藏list
    	stateList.style.display='none';
      // 变更文字
      stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
      // 重写状态栏
      loginStateShow.className='';
      loginStateShow.className='login-state-show '+id;
    }
 }

 document.onclick=function(){
 	  stateList.style.display='none';
 }
}

// 这个函数重新定义了单击操作（不放松）
function fnDown(event){
  event = event || window.event;
  var oDrag=document.getElementById('loginPanel'),
      // 光标按下时光标和面板之间的距离
      disX=event.clientX-oDrag.offsetLeft,
      disY=event.clientY-oDrag.offsetTop;
  // 移动
  document.onmousemove=function(event){
  	event = event || window.event;
  	fnMove(event,disX,disY);
  }
  // 释放鼠标
  document.onmouseup=function(){
  	document.onmousemove=null;
  	document.onmouseup=null;
  }
}

function fnMove(e,posX,posY){
  var oDrag=document.getElementById('loginPanel'),
      // 定义拖曳极限
      l=e.clientX-posX,
      t=e.clientY-posY,
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      maxW=winW-oDrag.offsetWidth-10,
      maxH=winH-oDrag.offsetHeight;
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=10;
  }else if(t>maxH){
    t=maxH;
  }
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}