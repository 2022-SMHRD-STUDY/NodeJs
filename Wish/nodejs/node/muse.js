/* var M = {
  v: "v",
  f: function () {
    console.log(this.v);
  },
}; */

var part = require("./mpart");
console.log(part); // mpart 에서 export한 객체
part.f();
