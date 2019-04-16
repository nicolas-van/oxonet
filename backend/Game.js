
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
    this.playing = 0;
    this.won = null;
    this.ended = false;
  }

  toJson() {
    return _.cloneDeep({
      id: this.id,
      players: this.players,
      board: this.board,
      playing: this.playing,
      won: this.won,
      ended: this.ended,
    });
  }

  addPlayer(player) {
    if (this.players[0] === player || this.players[1] === player) {
      throw new GameException(`Player ${player} already added`);
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
      throw new GameException(`Player ${player} unknown`);
    }
  }

  getPlayerNumber(player) {
    if (players[0] === player) {
      return 0;
    } else if (players[1] === player) {
      return 1;
    } else {
      throw new GameException(`Player ${player} unknown`);
    }
  }

  play(player, x, y) {
    const nbr = this.getPlayerNumber(player);
    if (nbr !== this.playing) {
      throw new GameException("Wrong player to play");
    }
    if (this.board[x][y] !== null) {
      throw new GameException("Invalid move");
    }
    this.this.board[x][y] = nbr;
    this.checkEnd();
  }
  checkEnd() {
    // check horizontal
    let x = 0;
    while (x < 3) {
      const first = this.board[x][0];
      const second = this.board[x][1];
      const third = this.board[x][2];
      if (first === second && first === third && first !== null) {
        this.stateSuccess(first);
        return;
      }
      x++;
    }
    // check vertical
    let y = 0;
    while (y < 3) {
      const first = this.board[0][y];
      const second = this.board[1][y];
      const third = this.board[2][y];
      if (first === second && first === third && first !== null) {
        this.stateSuccess(first);
        return;
      }
      y++;
    }
    // check crosses
    {
      const first = this.board[0][0];
      const second = this.board[1][1];
      const third = this.board[2][2];
      if (first === second && first === third && first !== null) {
        this.stateSuccess(first);
        return;
      }
    }
    {
      const first = this.board[0][2];
      const second = this.board[1][1];
      const third = this.board[2][0];
      if (first === second && first === third && first !== null) {
        this.stateSuccess(first);
        return;
      }
    }
    // check for a tie
    {
      let x = 0;
      let y = 0;
      while (x < 3) {
        while (y < 3) {
          if (this.board[x][y] === null) {
            return;
          }
        }
      }
      this.ended = true;
    }
  }
  stateSuccess(nbr) {
    this.won = nbr;
    this.ended = true;
  }
};