
module.exports = class CommunicationException extends Error {
  constructor(...params) {
    super(...params);

    this.name = 'CommunicationException';
  }
};