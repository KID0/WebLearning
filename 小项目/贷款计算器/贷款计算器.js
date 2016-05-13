
"use strict";
function calculate() {
	//读取输入值,并计算，绘图
	var amount = document.getElementById('amount');
	var apr = document.getElementById("apr");
	var years = document.getElementById("years");
	var zipcode = document.getElementById("zipcode");
	var payment = document.getElementById("payment");
	var total = document.getElementById("total");
	var totalinterest = document.getElementById("totalinterest");
	//将年度赔付转换为月度赔付
	//parseFloat()：将字符串转换为数字，此处可不用
	var principal = parseFloat(amount.value);//贷款总额
	var interest = parseFloat(apr.value)/100/12;//月利率
	var payments = parseFloat(years.value)*12;//还款总月份
	//计算每月赔付金额
	var x = Math.pow(1 + interest,payments);//幂方运算
	var monthly = (principal * x * interest)/(x - 1);
	//确认输入数据合法
	if (isFinite(monthly)) {
		payment.innerHTML = monthly.toFixed(2);
		//toFixed(2)：四舍五入，保留小数后两位
		total.innerHTML = (monthly * payments).toFixed(2);
		totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);
	
		//保存用户数据
		save(amount.value, apr.value, years.value, zipcode.value);

		try{//捕获代码异常
			getLenders(amount.value, apr.value, years.value, zipcode.value);
		}
		catch(e){/*忽略异常*/}
		//绘制图表
		chart(principal,interest,monthly,payments);
	} 
	else{
		//数据输入错误，清空数据
		payment.innerHTML = "";
		total.innerHTML = "";
		totalinterest.innerHTML = "";
		chart();
	}
}
function save(amount,apr,years,zipcode) {
	if (window.localStorage) {//如果浏览器支持localStorage方法的话
		localStorage.loan_amount = amount;
		localStorage.loan_apr = apr;
		localStorage.loan_years = years;
		localStorage.loan_zipcode = zipcode;
	} 
}

window.onload = function(){
	//如果浏览器支持该功能并且上次保存的值存在
	if (window.localStorage && localStorage.loan_amount) {
		document.getElementById("amount").value = localStorage.loan_amount;
		document.getElementById("apr").value = localStorage.loan_apr;
		document.getElementById("years").value = localStorage.loan_years;
		document.getElementById("zipcode").value = localStorage.loan_zipcode;
	}
}

//将用户输入发送到服务器
//返回本地放贷人列表（如果有这种服务的话）
function getLenders(amount,apr,years,zipcode) {
	//如果浏览器不支持XHR服务，退出
	if (!window.XMLHttpRequest) return;
	//显示放贷人列表
	var ad = document.getElementById("lenders");
	if (!ad) return;
	//将输入数据编码，附加在URL中
	var url = "getLenders.php" +
	"?amt=" + encodeURIComponent(amount) +
	"&apr=" + encodeURIComponent(apr) +
	"&yrs=" + encodeURIComponent(years) +
	"&zip=" + encodeURIComponent(zipcode);

	//提取返回对象
	var req = new XMLHttpRequest();
	req.open("GET",url);//通过URL发送HTTP GET请求
	req.send(null);//不带正文发送该请求

	//注册事件处理函数，当响应返回客户端时调用
	req.onreadystatechange = function() {
		//得到了一个合法完整的HTTP响应
		if (req.readyState == 4 && req.status == 200) {
			var response = req.responseText;//响应的形式是字符串
			var lenders = JSON.parse(response);//解析为JS数组
			//显示放贷人
			var list = "";
			for(var i = 0; i < lenders.length; i++){
				list += "<li><a href='" + lenders[i].url + "'>" +
				lenders[i].name + "</a>";
			}
			ad.innerHTML = "<ul>" + list + "</ul>"
		}
	}
}

//绘制图表
function chart(principal,interest,monthly,payments) {
	var graph = document.getElementById("graph");
	graph.width = graph.width//重置画布
	//如果不传入参数，或者浏览器不支持，返回
	if (arguments.length == 0 || !graph.getContext) return;
	//定义绘画API
	var g = graph.getContext("2d");
	var width = graph.width, height = graph.height;
	//将数据转化为像素
	function paymentToX(n) {
		return n * width / payments;
	}
	function amountToY(a) {
		return height - (a * height / (monthly * payments * 1.05));
	}
	//付款数据为直线：（0，0） 至 （payments,monthly*payments）
	g.moveTo(paymentToX(0),amountToY(0));//左下角
	g.lineTo(paymentToX(payments),amountToY(monthly * payments));//右下角
	g.lineTo(paymentToX(payments),amountToY(0));//右下方
	g.closePath();//封闭图形
	g.fillStyle = "#f88";
	g.fill();
	g.font = "blod 12px sans-serif";
	g.fillText("Total Interest Payments",20,20);

	var equity = 0;
	g.beginPath();//绘制新图形
	g.moveTo(paymentToX(0),amountToY(0));
	for (var p = 1; p <= payments; p++){
		var thisMonthsInterest = (principal - equity)*interest;
		equity += (monthly - thisMonthsInterest);
	}
	g.lineTo(paymentToX(p),amountToY(equity));
	g.lineTo(paymentToX(payments),amountToY(0));
	g.closePath();
	g.fillStyle = "green";
	g.fill()
	g.fillText("Total Equity",20,35);

	var bal = principal;
	g.beginPath();
	g.moveTo(paymentToX(0),amountToY(0));
	for(var p = 1; p <= payments; p++){
		var thisMonthsInterest = bal * interest;
		bal -= (monthly - thisMonthsInterest);
		g.lineTo(paymentToX(p),amountToY(bal));
	}
	g.lineWidth = 3;
	g.stroke();
	g.fillStyle = "black";
	g.fillText("Loan Balance",20,50);

	//x轴标记
	g.textAligh = "center";
	var y = amountToY(0);
	for (var year = 1; year * 12 <= payments;year++){
		var x = paymentToX(year * 12);
		g.fillRect(x - 0.5, y - 3, 1, 3);
		if (year == 1) g.fillText("year",x,y-5);
		if (year % 5 == 0 && year * 12 !== payments) g.fillText(String(year),x,y-5);
	}

	g.textAligh = "right";
	g.textBaseline = "middle";
	var ticks = [monthly * payments, principal];
	var rightEdge = paymentToX(payments);
	for  (var i = 0;i < ticks.length; i++){
		var y = amountToY(ticks[i]);
		g.fillRect(rightEdge - 3, y - 0.5, 3, 1);
		g.fillText(String(ticks[i].toFixed(o)),rightEdge - 5, y);
	}
}