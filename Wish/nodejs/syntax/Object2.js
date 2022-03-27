// array, object
var f = function () {
  console.log(1 + 1);
  console.log(1 + 2);
};

var f2 = function () {
  console.log("wish");
};

var a = [f];
a[0]();

var o = {
  func: f,
  fun: f2,
};

o.func();
o.fun();
