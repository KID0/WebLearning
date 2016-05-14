// Custom Date function to display a date in MM/DD/YYYY format
// 为日期格式化
Date.prototype.shortFormat = function() {
  return (this.getMonth() + 1) + "/" + this.getDate() + "/" + this.getFullYear();
}
