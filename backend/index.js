const express = require('express');
const path = require('path');
const Game = require('./Game');
const CommunicationException = require("./CommunicationException");

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));


const http = require('http').createServer(app);
const io = require('socket.io')(http);

const games = {};

const ex = (fct) => {
  return (...args) => {
    try {
      return fct(...args);
    } catch(e) {
      console.error("exception", e);
    }
  }
};

io.on('connection',ex((socket) => {
  let game = null;
  console.log(`user ${socket.id} connected`);

  socket.on('disconnect', ex(() => {
    if (game) {
      game.removePlayer(socket.id);
      io.in(`/game/${game.id}`).emit("gameState", game.toJson());
      console.log(`user ${socket.id} leaved game ${game.id}`);
      socket.leave(`/game/${game.id}`);
      game = null;
    }
    console.log(`user ${socket.id} disconnected`);
  }));

  socket.on('newGame', ex(() => {
    const game = new Game();
    games[game.id] = game;
    console.log(`user ${socket.id} asks for a new game, generated ${game.id}`);
    io.to(`${socket.id}`).emit("newGame", game.id);
  }));

  socket.on("enterGame", ex((gameId) => {
    if (! games[gameId]) {
      const tmp = new Game();
      tmp.id = gameId;
      games[tmp.id] = tmp;
    }
    games[gameId].addPlayer(socket.id);
    game = games[gameId];
    socket.join(`/game/${game.id}`);
    console.log(`user ${socket.id} joined game ${game.id}`);
    io.in(`/game/${game.id}`).emit("gameState", game.toJson());
  }));

  socket.on("exitGame", ex(() => {
    game.removePlayer(socket.id);
    io.in(`/game/${game.id}`).emit("gameState", game.toJson());
    console.log(`user ${socket.id} leaved game ${game.id}`);
    socket.leave(`/game/${game.id}`);
    game = null;
  }));

  socket.on("play", ex((msg) => {
    const x = msg[0];
    const y = msg[1];
    console.log(`user ${socket.id} playing move ${x},${y}`);
    game.play(socket.id, x, y);
    io.in(`/game/${game.id}`).emit("gameState", game.toJson());
    console.log(`user ${socket.id} played move ${x},${y}`);
  }));

  socket.on("reset", ex((msg) => {
    console.log(`user ${socket.id} reset game ${game.id}`);
    game.reset();
    io.in(`/game/${game.id}`).emit("gameState", game.toJson());
  }));
}));

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});