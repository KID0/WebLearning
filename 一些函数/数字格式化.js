function fmoney(s, n)   
{   
   n = (n > 0 && n <= 20) ? n : 2;
   //parseFloat()将字符串变为浮点数；
   //replace(A,B) 将字符串中的A替换为B；
   //replace(/[^\d\.-]/g, "") 将不是“数字”,“.”,“-”的符号换为“”
   //toFixed() 把 Number 四舍五入为指定小数位数的数字

   //第一行进行输入字符串数字的预处理
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
   /*将处理好的数字分割，取整数部分，再将整数部分分割为单个数字
   组成的数组，将数组逆序*/
   var l = s.split(".")[0].split("").reverse()；
   //r是其小数部分
   r = s.split(".")[1];   
   //新建立一个字符串
   t = "";   
   //每隔三位加一个逗号（注意：此处这个数组是整数部分的逆序）
   //得到的t已经是一个字符串
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   //将t分割为数字，变为正常顺序，然后用join()重新合并为一个字符串
   //加上小数点和小数部分
   return t.split("").reverse().join("") + "." + r;   
} 
