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


// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
// io.configure(function () {  
//     io.set("transports", ["xhr-polling"]); 
//     io.set("polling duration", 10); 
//   });
