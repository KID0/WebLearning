//各项元素初始化
var WINDOW_WIDTH = 0;
var WINDOW_HEIGHT = 0;
var RADIUS = 5;
var MARGIN_TOP = 50;
var MARGIN_LEFT = 350;

var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);
//getTime()：获取系统时间
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#F02C2C","#29F125","#5425CC","#10DD9D","#F0D629","#E919B9","#E0EA5E","#EC21AC","#F2B93D","#1B4686"];

window.onload = function(){//主体函数，设置初始化及更新，渲染
    WINDOW_WIDTH = document.documentElement.clientWidth - 19;
    WINDOW_HEIGHT = document.documentElement.clientHeight -19;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round((WINDOW_WIDTH*4/5/108))-1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
//以下两句固定格式，取得画布，获准在画布上涂鸦
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
//设置画布大小
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();//取得下一帧显示时间
    render(context);//，渲染函数
    setInterval(function(){//每间隔30m使用一次update（）函数
       //curShowTimeSeconds = getCurrentShowTimeSeconds();
        update();//更新数据，重新绘制图表，计算各个小球位置
        render(context);
    },30);
}

function update(){//更新数据，重新绘制图表，计算各个小球位置
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();//取得下一帧显示的时间数据
//以下：将秒转化为“时分秒”
    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = parseInt(nextShowTimeSeconds % 60);

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = parseInt(curShowTimeSeconds % 60);
//每隔一秒增加一次球（见效果），在不同的时间点增加的球位置数量不同
//如果时间发生变化，出现新球，然后将时间统一，等待更新
    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
        }
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

function updateBalls(){//此函数用来控制已有的球的数量，位置
    for(var i=0;i<balls.length;i++){//遍历每一个球，计算新坐标
        balls[i].x += balls[i].vx;//vx指x轴速度
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
       
        if(balls[i].y > WINDOW_HEIGHT - RADIUS){//如果球与屏幕下边缘重合，向上弹跳
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;//"-"是负号，后面的数字是弹跳系数
        }
     }

     var cnt = 0;//此部分控制x轴方向球的数量
     for(var i=0;i<balls.length;i++){
        if(balls[i].x  > 0 && balls[i].x  < WINDOW_WIDTH){
            balls[cnt++] = balls[i];
        }
     }
     while(balls.length >cnt) balls.pop();
}

function addBalls(x,y,num){//此函数通过“digit矩阵”来增加球
    for(var i =0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                var aBall = {//定义一个球的属性
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),//加速度竟然用了随机数
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,
                    //ceil()向上取整
                    //pow(x,y)返回x的y次方
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);//在balls[]创建新元素
            }
        }
}

function getCurrentShowTimeSeconds(){//计算下一帧显示的时间
    var curTimer = new Date();
    var ret = endTime.getTime() - curTimer.getTime();//结束时间点减去当前时间点（不断增大）=剩余时间
    ret = Math.round(ret/1000);

    return ret >=0? ret : 0;//显示时间不能小于零
}

function render(cxt){//更新显示时间数据，并用小球球显示时间

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

    for(var i=0;i<balls.length;i++){//绘制移动球图形
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x,y,num,cxt){//渲染球
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