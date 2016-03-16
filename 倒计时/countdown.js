//各项元素初始化
var WINDOW_WIDTH = 0;
var WINDOW_HEIGHT = 0;
var RADIUS = 5;
var MARGIN_TOP = 50;
var MARGIN_LEFT = 350;

var endTime = new Date();
//getTime()：获取系统时间
endTime.setTime(endTime.getTime()+3600*1000);

var curShowTimeSeconds = 0;
//球和球的颜色都用数组显示
var balls = [];
const colors = ["#F02C2C","#29F125","#5425CC","#10DD9D","#F0D629","#E919B9","#E0EA5E","#EC21AC","#F2B93D","#1B4686"];

window.onload = function(){//主体函数，设置初始化及更新，渲染
	//documentElement得到根节点
	//scrollWidth：对象的实际内容的宽度，不包括滚动条宽度。
	//clientWidth：对象内容的可视区的宽度，不包括滚动条等边线。
	//offsetWidth：对象整体的实际宽度，包括滚动条等边线。
    WINDOW_WIDTH = document.documentElement.clientWidth - 19;
    WINDOW_HEIGHT = document.documentElement.clientHeight -19;

    //Math.ceil()向上舍入；
    //Math.floor()：向下舍入；
    //Math.round()：四舍五入；
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    //该变量与小球半径有关
    RADIUS = Math.round((WINDOW_WIDTH*4/5/108))-1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
	//以下两句固定格式，取得画布，获准在画布上涂鸦
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
	//设置画布大小
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    //取得下一帧显示时间
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    //渲染；
    render(context);

    //setInterval()经常被用到呢
    setInterval(function(){//每间隔30m使用一次update（）函数
       //curShowTimeSeconds = getCurrentShowTimeSeconds();
        update();//更新数据，重新绘制图表，计算各个小球位置
        render(context);
    },30);
}

//更新数据，重新绘制图表，计算各个小球位置
function update(){

	//取得下一帧显示的时间数据
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	//以下：将秒转化为“时分秒”(JQ有现成函数可以用，这里太麻烦了)

    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = parseInt(nextShowTimeSeconds % 60);

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = parseInt(curShowTimeSeconds % 60);

	//每隔一秒增加一次球（见效果），在不同的时间点增加的球位置数量不同
	//如果时间发生变化，出现新球，然后将时间统一，等待更新
    if(nextSeconds != curSeconds){
        //以下六个if分别判断的是时分秒的十位和个位；
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }

        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT + 39 * (RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }

        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}

//此函数用来控制已有的球的数量，位置
function updateBalls(){
	//遍历每一个球，计算新坐标
    for(var i=0;i<balls.length;i++){
        //vx指x轴速度；
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
       	//如果球与屏幕下边缘重合，向上弹跳
        if(balls[i].y > WINDOW_HEIGHT - RADIUS){
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            //"-"是负号，后面的数字是弹跳系数；
            balls[i].vy = -balls[i].vy * 0.75;
        }
     }

     //此部分控制x轴方向球的数量，balls[]的更新；
     var cnt = 0;
     for(var i=0;i<balls.length;i++){
        if(balls[i].x  > 0 && balls[i].x  < WINDOW_WIDTH){
            balls[cnt++] = balls[i];
        }
     }
     while(balls.length >cnt) balls.pop();
}

//此函数依据倒计时的数字(“digit矩阵”)来增加彩球；
//(x,y)是新球的坐标
function addBalls(x,y,num){
	//找到num对应的digit数组；
    for(var i =0;i<digit[num].length;i++)
    	//遍历这个数组
    	//i是行j是列
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
            	//建立一个对象；
            	//对象中包含了这个对象的属性和值；（球的速度，位置等）
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    //ceil()向上取整
                    //pow(x,y)返回x的y次方
                    g:1.5+Math.random(),//加速度竟然用了随机数
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                //将这个对象push进balls[];
                balls.push(aBall);
            }
        }
}

//计算下一帧显示的时间
function getCurrentShowTimeSeconds(){
    var curTimer = new Date();
    var ret = endTime.getTime() - curTimer.getTime();//结束时间点减去当前时间点（不断增大）=剩余时间
    ret = Math.round(ret/1000);

    //显示时间不能小于零
    return ret >=0? ret : 0;
}

//更新显示时间数据（用小球球显示时间），绘制balls[]中的彩球；
//这里的输入就是画布；
function render(cxt){

    //清空画布
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    //计算显示时间
    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
    var seconds = curShowTimeSeconds%60;
	//以下八行代码用于计算所显示数字和“：”的位置，并绘制显示时间
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,cxt);//这是“：”
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,cxt);//这是“：”
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    //绘制彩球；
    for(var i=0;i<balls.length;i++){
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }
}

//该函数用于绘制显示时间的球
function renderDigit(x,y,num,cxt){
    cxt.fillStyle = "rgb(0,102,153)";

    for(var i = 0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
}