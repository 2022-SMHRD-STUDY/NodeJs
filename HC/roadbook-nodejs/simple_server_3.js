const http = require('http');

http.createServer((req,res) => {
    console.log(req.url);
    console.log(req.method);
}).listen(8082, ()=>{
    console.log("8082포트에서 서버 연결중...")
});