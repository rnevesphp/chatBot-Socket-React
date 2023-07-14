const http = require('http');

const server = http.createServer();

const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket => {
    console.log('cliente conectado ');


    socket.on('chatUser', (info) => {
        console.log(info);

        io.emit('chatUser', info)
    })
}))
server.listen(3000);