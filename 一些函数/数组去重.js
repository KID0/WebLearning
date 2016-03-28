//去除一个数组中的重复；

function deRepeat(arr){
    var newArr=[];
    var obj={};
    var index=0;
    var l=arr.length;
    //遍历arr；
    //利用“object”查重，也是有趣；
    for(var i=0;i<l;i++){
        if(obj[arr[i]]==undefined)
          {
            obj[arr[i]]=1;
            //“++”在后ian，先运算，后加一；
            newArr[index++]=arr[i];
          }
        else if(obj[arr[i]]==1)
          continue;
    }
    return newArr;
}