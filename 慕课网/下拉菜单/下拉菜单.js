window.onload=function(){
  //读取所需节点
  var box=document.getElementById('divselect'),
      title=box.getElementsByTagName('cite')[0],
      menu=box.getElementsByTagName('ul')[0],
      aSite=box.getElementsByTagName('a'),
      //代表list中的某一选项，-1表示没有选项被选中
      index=-1;

  // 点击显示框
  title.onclick=function(event){
    //阻止事件冒泡（浏览器兼容性）
    //如果不阻止，会导致随即点击document：menu出现后立刻被隐藏
    event=event || window.event; 
  	if(event.stopPropagation){
  		event.stopPropagation();
  	}else{
  		event.cancelBubble=true;
  	}

    //点击之后出现所有选项
  	menu.style.display='block';

    //当某个键盘按键被松开
    document.onkeyup=function(e){
      e=e || window.event;
      //取消所有锚点的背景颜色
      for(var i=0;i<aSite.length;i++){
        aSite[i].style.background='none';
      }

      // 如果按下了 向下 方向键
      //注意，这里index的变化只与方向键有关，且在网页刷新之前保持
      //并不与鼠标协同，所以显示上有一些问题
      if(e.keyCode==40){
         index++;
         if(index>=aSite.length){
           index=0;
         }
         aSite[index].style.background="#ccc";
      }
      // 如果按下了 向上 方向键
      if(e.keyCode==38){
         if(index<=0){
           index=aSite.length;
         }
         index--;   
         aSite[index].style.background="#ccc";      
      }

      // 如果按下了回车键并且index有值（键盘选中了某一选项）
      if(e.keyCode==13 && index!=-1){
        //显示这个值
        title.innerHTML=aSite[index].innerHTML;
        //将所有选项的背景色取消
        for(var i=0;i<aSite.length;i++){
          aSite[i].style.background='none';
        }
        //隐藏菜单
        menu.style.display='none';
        //取消选项选中
        index=-1;    
      }
    }
  }

  // 滑过滑过、离开、点击每个选项时
  //有些疑惑：这个forloop可以一直存在？为什么loop里的事件监听一直存在？
  for(var i=0;i<aSite.length;i++){
  	aSite[i].onmouseover=function(){this.style.background='#ccc';}
  	aSite[i].onmouseout=function(){this.style.background='none';}
    //此处点击将事件传递给了document
    //等价于：先点击了一个aSite，然后点击了document(页面空白处)
  	aSite[i].onclick=function(){title.innerHTML=this.innerHTML;}
  }
  
  // 点击页面空白处时
  document.onclick=function(){
    menu.style.display='none';
  }
}