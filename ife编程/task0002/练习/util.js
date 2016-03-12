function isArrry(arr) {
	return (arr.constructor == Array);
}

function isFunction(fn) {
	return ((typeof fn) == function);
}

function isEmail(emailStr) {
    var re = /^(\w+)+\@+(.+)/i;
}