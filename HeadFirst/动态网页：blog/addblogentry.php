<?php
// 设置变量
$filename = "blog.xml";

// file_exists() 函数检查文件或目录是否存在
if (file_exists($filename)) {
  // Load the blog entries from the XML file
  $rawBlog = file_get_contents($filename);
}
// 如果找不到文件——创建一个新文件
else {
  // Create an empty XML document
  // .=	串接赋值
  // $rawBlog代表整个文件的内容
  $rawBlog = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
  $rawBlog .= "<blog><title>YouCube - The Blog for Cube Puzzlers</title>";
  $rawBlog .= "<author>Puzzler Ruby</author><entries></entries></blog>";
}

// SimpleXmlElement():Represents an element in an XML document.
/*
SimpleXML 函数允许您把 XML 转换为对象。
通过普通的属性选择器或数组迭代器，可以处理这个对象，就像处理任何其他对象一样
*/
$xml = new SimpleXmlElement($rawBlog);

// Add the new blog entry as a child node
// "->":使用对象的方法和属性
$entry = $xml->entries->addChild("entry");
//  $_REQUEST 用于收集HTML表单提交的数据
$entry->addChild("date", $_REQUEST["date"]);
// 删除反斜杠
$entry->addChild("body", stripslashes($_REQUEST["body"]));
// 文件是可选的，所以可能没有
if ($_REQUEST["image"] != "")
  $entry->addChild("image", $_REQUEST["image"]);

// Write the entire blog to the file
$file = fopen($filename, 'w');
// asXML() 函数以字符串的形式从 SimpleXMLElement 对象返回 XML 文档
fwrite($file, $xml->asXML());
fclose($file);
?>
