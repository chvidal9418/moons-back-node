const moment = require('moment');
const http = require('http');
const socketIo = require('socket.io');
const {Message} = require('./models/Message');
const {contactsDummy} = require('./models/Contacts.js');
const {Conversation} = require('./models/Conversation.js');
const {User} = require('./models/User.js');
const {v4} = require('uuid');


const socket = app => {
  const server = http.createServer(app);
  const io = socketIo(server);
  const activeUsers = {};
  const activeChats = {};


  io.on('connection', socket => {

    console.log('User connected!', socket.client.conn.server.clientsCount);


    socket.on('join', user => {
      socket.user = {...user, id: socket.client.id};
      activeUsers[socket.client.id] = new User({...user, id: v4()});
      socket.emit('login', {activeUsers, contactsDummy, activeChats, user: socket.user});
      sendConversations(socket);
    });

    socket.on('joinChat', ({sender, receiver}) => {
      let id = v4();
      activeChats[id] = new Conversation({
        id,
        sender, receiver,
        creationDate: moment().format('dd-mm-yy, h:mm a')
      });
      sendConversations(socket);

    });

    socket.on('sendMessage', data => {
      const chatId = data.chatId;
      const messageId = v4();
      const message = new Message({
        content: data.message,
        sender: data.sender,
        receivedDate: moment().format('MMMM Do YYYY h:mm:ss a')
      });
      if (activeChats[chatId].messages) {
        activeChats[chatId].messages[messageId] = message;
        activeChats[data.chatId].lastMessage = message;
      } else {
        activeChats[chatId].messages = {};
        activeChats[chatId].lastMessage = message;
        activeChats[chatId].messages[messageId] = message;
      }
      socket.emit('message', {message, chatId, messageId});
      socket.broadcast.emit('message', {message, chatId, messageId});
    });

    socket.on('contacts', () => {
      socket.emit('contacts', contactsDummy);
    });

    socket.on('conversations', () => {
      sendConversations(socket);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected!');
      delete activeUsers[socket.client.id];
    });
  });

  function sendConversations(socket) {
    let conversations = [];
    let keys = Object.keys(activeChats);
    keys.forEach(key => {
      let actualConversation = activeChats[key];
      conversations.push({...actualConversation});
    });

    console.log(conversations);
    socket.emit('conversations', conversations);
    socket.broadcast.emit('conversations', conversations);
  }

  return server;
};

module.exports = socket;
