// setting server
const path = require('path');
const express = require('express');
const app = express();

// settings server
app.set('port',process.env.PORT || 3000);

// static file
app.use(express.static(path.join(__dirname,'public')));

// start the server
const server = app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

// setting socket
const socketIo = require('socket.io');
const io = socketIo(server);

// wedsockets
io.on('connection', (socket) => {
    console.log('new connnection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});
