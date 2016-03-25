/* 
 * mandel.js
 */

//主文件，用于控制整个工作流程
//初始化
var numberOfWorkers = 8;
var workers = [];
var rowData;
var nextRow = 0;
var generation = 0;

//页面载入完成后开始工作
window.onload = init;

function init() {
	//绘制图形
	setupGraphics();

	//
	// When you click on the canvas, the handler is called.
	// An event object is passed in that contains the
	//  x, y position of the mouse click. We pass those
	//  values to the click handler.
	//

	//处理鼠标点击
	canvas.onclick = function(event) {
		handleClick(event.clientX, event.clientY);
	};
	//
	// When you resize the browser window, we need
	//	to resize the canvas and restart the workers.
	//


	//窗口变化时重新布置画布
	window.onresize = function() {
		resizeToWindow();
	};

	//
	// Create all the workers and set up the message handler.  
	// 	Add each worker to the workers array.
	//


	//创建新线程，运行"worker.js"文件
	for (var i = 0; i < numberOfWorkers; i++) {
		var worker = new Worker("worker.js");

		//当收到这个线程发来的消息时
		worker.onmessage = function(event) {
			processWork(event.target, event.data)
		}

		worker.idle = true;
		workers.push(worker);
	}

	//
	// Start the workers
	//
	startWorkers();

}

//
// startWorkers
//	This function resets the workers to start them working
//		at the top of the fractal (row 0). It loops through
//		all the workers in the workers array and assigns
//		each worker a task to compute a row.
//	By posting a message with the task, we start the
//		worker's computation.
//

//开始工作
function startWorkers() {
	generation++;
	nextRow = 0;
	for (var i = 0; i < workers.length; i++) {
		var worker = workers[i];
		if (worker.idle) {
			var task = createTask(nextRow);
			worker.idle = false;
			worker.postMessage(task);
			nextRow++;
		}
	}
} 

//
// processWork
// 	This is the function we call when the worker posts
//		back a message with the results.
//	If the worker is working on the current fractal
//		generation, we draw the row of data, otherwise
//		we just throw the data away.
//	Once we've used the results, we assign the worker to
//		start computing another row.
//

//处理工作线程返回id数据
function processWork(worker, workerResults) {
	if (workerResults.generation == generation) {
		drawRow(workerResults);
	}
	reassignWorker(worker);
}

//
// reassignWorker
//	This function gives an idle worker its next task.
//


//向线程中分配任务
function reassignWorker(worker) {
	var row = nextRow++;
	if (row >= canvas.height) {
		worker.idle = true;
	} else {
		var task = createTask(row);
		worker.idle = false;
		worker.postMessage(task);
	}
}


// handleClick
//	This function takes the x, y position where the user
//		clicked and sets the parameters for the new
//		fractal. The zoom factor sets the new extent
//		of the bounds of the Mandelbrot set to the
//		zoomed in size. The new fractal maintains
//		the aspect ratio of the current canvas size.
//	We start the workers over on the new zoomed in
//		fractal.
//


//处理点击，放大窗口
function handleClick(x, y) {
	var width = r_max - r_min;
	var height = i_min - i_max;
	var click_r = r_min + ((width * x) / canvas.width);
	var click_i = i_max + ((height * y) / canvas.height);

	var zoom = 8;

	r_min = click_r - width/zoom;
	r_max = click_r + width/zoom;
	i_max = click_i - height/zoom;
	i_min = click_i + height/zoom;

	startWorkers();
}

//
// resizeToWindow
//	When the user resizes the browser window,
//		this function is called to resize the canvas,
//		and reset the fractal parameters (changing the
//		extent of the boundary and maintaining the new
//		aspect ratio of the window).
//	We restart the workers to compute the new fractal
//		based on the new size.
//

//重新设置画布，数据
function resizeToWindow() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var width = ((i_max - i_min) * canvas.width / canvas.height);
	var r_mid = (r_max + r_min) / 2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;
	rowData = ctx.createImageData(canvas.width, 1);

	startWorkers();
}

