/* 
 * worker.js 
 */

//工作线程文件

//引入另一个脚本
importScripts("workerlib.js");

//接到一个任务
onmessage = function (task) {
	//处理计算
	var workerResult = computeRow(task.data);
	//发送结果
	postMessage(workerResult);
}
