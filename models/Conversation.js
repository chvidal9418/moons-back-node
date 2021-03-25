'use strict';

class Conversation {
  constructor({ id, sender, receiver, creationDate, messages, lastMessage }) {
    this.id = id;
    this.sender = sender;
    this.receiver=receiver
    this.creationDate=creationDate
    this.messages=messages||{}
    this.lastMessage= lastMessage||{}
  }
}

module.exports = {
  Conversation
};
