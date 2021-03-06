Date.prototype.Format = function (formatStr) {
  var str = formatStr;
  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
  var month = this.getMonth() + 1;
  str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
  str = str.replace(/M/g, month);
  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());
  var hour=this.getHours().toString().padStart(2, '0')
  str = str.replace(/hh|HH/, hour);
  var min=this.getMinutes().toString().padStart(2, '0')
  str = str.replace(/mm/, min);
  var sec=this.getSeconds().toString().padStart(2, '0')
  str = str.replace(/ss|SS/, sec);
  return str;
}
