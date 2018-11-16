const express = require('express');

const app = express();


const server = app.listen(3030, function() {
    console.log('server running on port 3030');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {

    console.log(socket.id)

    socket.on('SEND_LOCATION', function(data){
        io.emit('LOCATION', data)
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});
