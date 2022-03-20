//커맨드라인에서 파라미터 입력받기
var args = process.argv;
console.log(args);
console.log(args[2]);

if(args[2]==123){
    console.log('123이네요')
}else{
    console.log('그거아닌데');
}
console.log('무조건 나오는 문자열');