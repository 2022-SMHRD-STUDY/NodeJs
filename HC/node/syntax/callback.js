/*
function a() {
    console.log('A');
}
*/
var a = function() {
    console.log('A');
}
// => 자바스크립트에서는 함수가 값이다!

function slowFunc(callback){
    callback();
}

slowFunc(a);