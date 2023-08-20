const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(443,() => {
    console.log('443번 포트에서 서버 대기 중입니다.')
});

//최신 http 프로토콜인 http2를 사용하는 방법 기존 httlp 대비 응답방식이 개선되어 효율적으로
//응답하여 웹속도가 개선된다.