const conversations = [
  {
    title: 'Dr. Yair Zyman',
    description: 'I received my new watch that i ordered from Amazon.',
    receivedDate: '23 min',
    messageCount: 1
  },
  {
    title: 'Dra. Gloria Saravia',
    description: 'remember that you have to go to an assessment consultation, don’t forget it is important for your moons',
    receivedDate: '3 hrs',
    messageCount: 0
  },
  {
    title: 'Dra. Nayeli Ugalde',
    description: 'remember that you have to go to an assessment consultation, don’t forget it is important for your moons',
    receivedDate: '1 day',
    messageCount: 0
  }
];

class Message {
  constructor({ content, receivedDate, sender }) {
    this.content = content;
    this.receivedDate = receivedDate;
    this.sender = sender;
  }
}

module.exports = {
  conversations,
  Message
};
