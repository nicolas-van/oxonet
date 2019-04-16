const express = require('express');
const path = require('path');
const Game = require('./Game');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));


const http = require('http').createServer(app);
const io = require('socket.io')(http);

const games = {};

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on('newGame', () => {
    const game = new Game();
    games[game.id] = game;
    console.log(`user ${socket.id} asks for a new game, generated ${game.id}`);
    io.to(`${socket.id}`).emit("newGame", game.id);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});