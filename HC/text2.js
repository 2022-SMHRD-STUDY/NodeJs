let time = new Date();
let hours = time.getHours();
let minutes = time.getMinutes();
let seconds = time.getSeconds();


console.log(`첫번째 ______________ 걸린시간 : ${hours}시${minutes}분${seconds}초`);
setTimeout(()=>{
    console.log(`두번째 ______________ 걸린시간 : ${hours}시${minutes}분${seconds}초`);
},1000);



setTimeout(()=>{
    console.log(`세번째 ______________ 걸린시간 : ${hours}시${minutes}분${seconds}초`);
},500);

setTimeout(function(){
    console.log(`세번째 ______________ 걸린시간 : ${hours}시${minutes}분${seconds}초`);
},1000);

