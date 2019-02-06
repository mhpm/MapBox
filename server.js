const express = require("express");
const port = process.env.PORT || 3030;

const app = express();

app.use(express.static(__dirname + "/dist/"));

app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html");
});

app.listen(port);

console.log("server started... " + port);

const io = require('socket.io')(server);

io.on('connection', function (socket) {

  console.log(socket.id)

  socket.on('SEND_LOCATION', function (data) {
    io.emit('LOCATION', data)
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});