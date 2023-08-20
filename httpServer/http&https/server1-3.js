const https = require('https');
const fs = require('fs');

const server = https.createServer({
    cert : fs.readFileSync('도메인 인증서 경로'),
    key : fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(443,() => {
    console.log('443번 포트에서 서버 대기 중입니다.')
});

//https 모듈을 사용하는 방법 암호화를 통해 웹 사용시 안전성을 높여준다.
//이 모듈을 사용하려면 기관에서 인증서를 발급받아야 한다.
