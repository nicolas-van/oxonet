
module.exports = class GameException extends Error {
  constructor(...params) {
    super(...params);

    this.name = 'GameException';
  }
};