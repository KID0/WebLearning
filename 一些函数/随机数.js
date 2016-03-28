//用js实现随机选取10–100之间的10个数字
var iArray = []; 
funtion getRandom(iStart, iEnd){
        return Math.floor(Math.random() * (iEnd - iStart) + iStart;
}
for(var i=0; i<10; i++){
        iArray.push(getRandom(10,100));
}