const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const crypto = require('crypto');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
// In-memory data storage
let users = [];
let messages = [];

// User management
function registerUser(username, password) {
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return null;
  }

  const newUser = {
    id: generateUserId(),
    username,
    password: hashPassword(password)
  };
  users.push(newUser);
  return newUser;
}

function authenticateUser(username, password) {
  const user = users.find(u => u.username === username);
  if (user && user.password === hashPassword(password)) {
    return user;
  }
  return null;
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateUserId() {
  return 'user-' + Math.random().toString(36).substring(2, 8);
}

// Chat functionality
function addMessage(message, senderId, username) {
  const newMessage = { id: generateMessageId(), message, senderId, username, timestamp: Date.now() };
  messages.push(newMessage);
  io.emit('message_received', newMessage);
}

function generateMessageId() {
  return 'msg-' + Math.random().toString(36).substring(2, 8);
}

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('register', (data) => {
    const { username, password } = data;
    const newUser = registerUser(username, password);
    if (newUser) {
      socket.user = newUser;
      socket.emit('registered', newUser);
      socket.emit('message_history', messages);
    } else {
      socket.emit('registration_failed');
    }
  });

  socket.on('login', (data) => {
    const { username, password } = data;
    const user = authenticateUser(username, password);
    if (user) {
      socket.user = user;
      socket.emit('authenticated', user);
      socket.emit('message_history', messages);
    } else {
      socket.emit('authentication_failed');
    }
  });

  socket.on('send_message', (data) => {
    const { message } = data;
    if (socket.user) {
      addMessage(message, socket.user.id, socket.user.username);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});