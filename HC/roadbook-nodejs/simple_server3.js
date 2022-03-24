const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Node.js로 서버 만들기</h1>');
    res.end('<p>3장 http모듈 공부 중입니다.</p>');
}).listen(8082);

/* Listening Event Listener*/
server.on('listening',()=>{
    console.log('8082포트에서 서버 연결중...')
});

/* Error Event Listener */
server.on('error', ()=>{
    console.log('error');
});
