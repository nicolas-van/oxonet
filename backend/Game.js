
const GameException = require("./GameException");
const uuidv4 = require('uuid/v4');
const _ = require('lodash');

module.exports = class Game {
  constructor() {
    this.id = uuidv4();
    this.players = [null, null];
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  toJson() {
    return _.cloneDeep({
      id: this.id,
      players: this.players,
      board: this.board,
    });
  }

  addPlayer(player) {
    if (this.players[0] === player || this.players[1] === player) {
      throw new GameException("Player already added");
    }
    if (this.players[0] === null) {
      this.players[0] = player;
    } else if (this.players[1] === null) {
      this.players[1] = player;
    } else {
      throw new GameException("Too much players already");
    }
  }

  removePlayer(player) {
    if (this.players[0] === player) {
      this.players[0] = null;
    } else if (this.players[1] === player) {
      this.players[1] = null;
    } else {
      throw new GameException("Player unknown");
    }
  }

  play(x, y, value) {
    if (this.board[x][y] === null) {
      this.this.board[x][y] = value;
    } else {
      throw new GameException("Invalid move");
    }
  }
};