// 오늘은 node.js 에서 압도적으로 많이 사용되는. express 이용하여 서버를 구축해 본다!!
// 이에 앞서, 왜 기존에 http 모듈만 으오 서버를 개발했을 때 불편한지 확인.

// var http = require("http");
var fs = require("fs")

// 굳이 말하자면 http 모듈만으로는 서버를 개발하려면 많은 코드량과 기능이 부족하여 이러한 문제점을 개선하시 위해서 개발된 모듈이  express 이다.
// http 모듈에 비해 훨씬 더 많은 기능을 가지고 있다.

var express = require("express")
var app = express();

// 웹소켓 서버 준비

var WebSocket = require("ws")
var socketArray = []; // 접속하는 웹클라이언트들을 보관할 배열

// express 모듈을 미들웨어라는 함수를 지원한다!!
// 미들웨어 중 정적자원을 처리하는 static()을 이용해본다!!

// POST 방식으로 전달되는 데이터를 처리해주는 모듈 추가
var bodyParser =require("body-parser");
app.use(express.static(__dirname))
console.log(__dirname);
// 미들 웨어 추가.
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.post("/regist" ,function(req ,res){
    // console.log(req.body)
    console.log("post!");

    var data = req.body;
    console.log(data)
    send(data);

});

app.use(function(req,res){

    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end("express TEST");

});



app.listen(9999, function(){
    console.log("Server is running at 9999 port....");
});

// 웹소켓 관련 로직 !!
var socketServer = new WebSocket.Server({port:7979});


// 이벤트 처리!!
socketServer.on("connection", function(socket){

    socketArray.push(socket);
    console.log("현재 접속자 :" ,socketArray.length,"명");

})

// 접속한 모든 웹클라이언트 브라우저에게 정보를 전달하자


function send(data){
// 접속한 모든 웹 브라우저에게 브로드 캐스팅하자.

    for (var i =0 ; i < socketArray.length ; i++){
        socketArray[i].send(JSON.stringify(data));
                
        
    }
}


// var server = http.createServer(function(req,res){
//     fs.readFile("test.html","utf8",function(err,data){
//         res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
//         res.end(data);
//     });    
// });
// server.listen(9999, function(){
//     console.log("Server is running at 9999 port....")
// })
