//深度克隆

// 方法一：
//
//JavaScript 中的所有事物都是对象：字符串、数字、数组、日期，等等
//但是“object”特指“{}”；
//

//js中的“对象”“object”还是很乱，需要进一步学习；

//object.prototype.name=value；
//为所有对象添加一个clone属性，这个属性是一个函数；
Object.prototype.clone = function(){
	//判断这个对象是否是一个数组，如果不是则创建一个{}；
	//如果传入一个数字-->[{2},{3},{9}]似乎和[2,3,9]等价；
    var obj = ((this.constructor) === Array ? [] : {});
    for(var element in this){
    	//判断这个元素是否依然是“object”，如果是，递归！
        obj[element] = (typeof this[element] === "object") ? this[element].clone() : this[element];
    }
    return obj;


//方法二：
function clone(Obj) {   
    var buf;   
    //如果传入是一个数组；
    if (Obj instanceof Array) {   
        buf = [];
        var i = Obj.length;   
        while (i--) {
        	//对这个数组中的每一个元素都递归使用此函数；
            buf[i] = clone(Obj[i]);   
        }
        return buf;
    //如果传入是一个Object；
    }else if (Obj instanceof Object){   
        buf = {};
        //遍历这个对象；
        for (var k in Obj) {
            buf[k] = clone(Obj[k]);   
        }   
        return buf;   
    }else{                         
		//普通变量直接赋值；
        return Obj;   
    }   
}