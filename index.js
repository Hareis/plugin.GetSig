const express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// 解析 application/json
app.use(bodyParser.json());

class page {
    constructor(socket) {
        this.id = socket.id;
        this._socket = socket;
        this.status = 0;
    }
    getSocket() {
        this.status = 1;
        return this._socket;
    }
    dispose() {
        this.status = 0;
    }
}

const pagers = [];

function rnd(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}
function calcCount() {
    console.log('valid count: ',pagers.filter(e=>e.status==0).length);
    console.log('invalid count:',pagers.filter(e=>e.status!=0).length);
}

/**
 * 向外公开接口，接收外来需要签名的内容
 */
app.post("/token", async function (req, res) {

    setTimeout(function () {
        calcCount() 
    },0)

    var tempArray = pagers.filter(e => e.status == 0)
    if (tempArray.length > 0) {
        let pager = tempArray[rnd(0,tempArray.length-1)],
            socket = pager.getSocket();

        //向浏览器发送内容
        socket.emit('sendBaseStr', req.body.img_buf);

        let sigStr = await new Promise((resolve, reject) => {
            socket.once('reviceCode', (data) => {
                pager.dispose()
                resolve(data)
            })
        })
        res.send(sigStr)

    } else {
        res.send("Couldn't find can use the resources")
    }
})

io.on('connection', function (socket) {

    console.log('new pager add in');

    pagers.push(new page(socket))

    calcCount();

    socket.on('disconnect', _ => {
        pagers.splice(pagers.indexOf(this), 1)
        calcCount();
    })
    

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});