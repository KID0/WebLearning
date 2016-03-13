#readme

本文件夹包含了《HeadFirst HTMLCSS》一书的部分案列<br>
选取了部分有代表性的例子并进行了删改

chap9_lounge-complete该文件中使用了CSS3的特性mediaquery，
并且分两种情况引用了CSS文件
1.同一个CSS文件包含三种媒体类别
2.同时引用三个CSS文件，通过先后顺序确定优先级
（注：原代码中“lounge-mediaquery.css”中的一些错误得到了修正）

chapter11_starbuzz和chapter12_starbuzz建立的相同的页面，差别很小
对比：
前者使用了<div id="nav"></div>形式
后者使用了<nav></nav>,html5 的新特性
虽然页面显示近乎相同，但是为内容增添的属性，更加便于搜索引擎的识别以及维护
注：这一特性目前在浏览器中支持并不好，请谨慎使用