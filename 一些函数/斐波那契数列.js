function fib(n){
	if (n==0) return 0;
    if(n==1||n==2) return 1;
    return fib(n-1)+fib(n-2);
}


//0、1、1、2、3、5、8、13、21、34
//F（0）=0，F（1）=1，F（n）=F(n-1)+F(n-2)