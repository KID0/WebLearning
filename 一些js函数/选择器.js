//输入选择器，返回DOM节点

var query = function(selector) {
    //没看懂这个正则，匹配图像？
    //从左到右：id,class,单词字符，分别regResult[1]，regResult[2]，regResult[3]？
    //"?"：零次或一次
    var reg = /^(#)?(\.)?(\w+)$/img;
    //RegExpObject.exec(string):用于检索字符串中的正则表达式的匹配；
    //返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null
    //regResult中是匹配的结果
    var regResult = reg.exec(selector);
    var result = [];
    
    //如果是id选择器
    //这里的条件是"#xxx",正好是id选择器
    if(regResult[1]) {
        if(regResult[3]) {
            //如果querySelector可以使用，就用querySelector，否则用getElementById
            if(typeof document.querySelector === "function") {
                //在这里只丢进去单词字符应该不行吧~
                result.push(document.querySelector(regResult[3]));
            }
            else {
                result.push(document.getElementById(regResult[3]));
            }
        }
    }
    
//如果是class选择器
    else if(regResult[2]) {
        if(regResult[3]) {
            //如果支持getElementsByClassName函数
            if(typeof document.getElementsByClassName === 'function') {
                var doms = document.getElementsByClassName(regResult[3]);
                if(doms) {
                    //
                    result = converToArray(doms);
                }
            }
            
            //如果不支持getElementsByClassName函数
            else {
                var allDoms = document.getElementsByTagName("*") ;
                for(var i = 0, len = allDoms.length; i < len; i++) {
                    if(allDoms[i].className.search(new RegExp(regResult[2])) > -1) {
                        result.push(allDoms[i]);
                    }
                }
            }
        }
    }
    
//如果是标签选择器
    else if(regResult[3]) {
        var doms = document.getElementsByTagName(regResult[3].toLowerCase());
        if(doms) {
            result = converToArray(doms);
        }
    }
    return result;
}


//将一个节点转化成为array
//看不懂
function converToArray(nodes){
    var array = null;         
    try{        
        array = Array.prototype.slice.call(nodes,0);
    //针对非IE浏览器         
    }catch(ex){
        array = new Array();         
        for( var i = 0 ,len = nodes.length; i < len ; i++ ) { 
        array.push(nodes[i])         
        }         
    }      
    return array;
}