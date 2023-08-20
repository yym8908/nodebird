const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디: ${process.pid}`);

    //cpu 개수만큼 워커를 생산
    for(let i = 0; i < numCPUs; i+= 1){
        cluster.fork();
    }

    //워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork();//하나 종료될때 하나 다시 생산--오류로인해 하나가 종료되어도 계속 생산 하는것 좋은 방법은 아님
    });
}else{
    //워커들이 포트에서 대기
    http.createServer((req, res)=> {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(()=>{ // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
            process.exit();
        }, 1000);
    }).listen(8086);
    
    console.log(`${process.pid}번 워커 실행`);
}

//클러스터는 싱글 프로세스로 작동하는 노드의 부하를 줄이기 위해 병렬 형태로 작동할 수 있도록 해준다.
//9~11번 코드는 현재 사용중인 pc의 코어수만큼 워커를 생산하고 들어온 요청을 각각 나누어 처리할 수 있게된다.
