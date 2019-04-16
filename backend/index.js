const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));


const http = require('http').createServer(app);
const io = require('socket.io')(http);

let number = 0;

io.on('connection', function(socket) {
  const fctNumber = number;
  number += 1;

  console.log('an user connected on ' + fctNumber);

  socket.on('disconnect', function() {
    console.log('user disconnected from ' + fctNumber);
  });

  socket.on('chat message', function(msg){
    console.log('message from ' + fctNumber + ': ' + msg);
    io.emit('chat message', msg);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});