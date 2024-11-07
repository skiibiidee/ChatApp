const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const crypto = require("crypto");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const randomCharacters = [...Array(32)]
  .map(() => Math.floor(Math.random() * 16).toString(16))
  .join("");
console.log(randomCharacters);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/" + randomCharacters, (req, res) => {
  console.log("data requested");
  res.send(JSON.stringify({ messages, users }));
});
// In-memory data storage
let needsSaving = false;
let users = [];
let messages = [];

// User management
function registerUser(username, password) {
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return null;
  }
  const tooLong = username.length > 32 || password.length > 32;
  if (tooLong) {
    return null;
  }
  const newUser = {
    id: generateUserId(),
    username,
    password: hashPassword(password),
  };
  users.push(newUser);
  needsSaving = true;
  return newUser;
}

function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username);
  if (user && user.password === hashPassword(password)) {
    return user;
  }
  return null;
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateUserId() {
  return "user-" + Math.random().toString(36).substring(2, 8);
}

// Chat functionality
function addMessage(message, senderId, username) {
  const newMessage = {
    id: generateMessageId(),
    message: message.slice(0, 250),
    senderId,
    username,
    timestamp: Date.now(),
  };
  messages.push(newMessage);
  needsSaving = true;
  io.emit("message_received", newMessage);
}

function generateMessageId() {
  return "msg-" + Math.random().toString(36).substring(2, 8);
}

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("register", (data) => {
    const { username, password } = data;
    const newUser = registerUser(username, password);
    if (newUser) {
      socket.user = newUser;
      socket.emit("registered", newUser);
      socket.emit("message_history", messages);
    } else {
      socket.emit("registration_failed");
    }
  });

  socket.on("login", (data) => {
    const { username, password } = data;
    const user = authenticateUser(username, password);
    if (user) {
      socket.user = user;
      socket.emit("authenticated", user);
      socket.emit("message_history", messages);
    } else {
      socket.emit("authentication_failed");
    }
  });

  socket.on("send_message", (data) => {
    const { message } = data;
    if (socket.user) {
      addMessage(message, socket.user.id, socket.user.username);
    }
  });
  let userstyping = {};
  socket.on("user_stopped_typing", (username) => {
    if (Object.keys(userstyping).includes(username)) {
      clearTimeout(userstyping[username]);
      delete userstyping[username];
      io.emit("user_stopped_typing", username);
    }
  });

  socket.on("user_started_typing", (username) => {
    if (!Object.keys(userstyping).includes(username)) {
      userstyping[username] = setTimeout(() => {
        delete userstyping[username];

        io.emit("user_stopped_typing", username);
      }, 5000);
      io.emit("user_started_typing", username);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

function main() {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  setInterval(() => {
    if (needsSaving) {
      needsSaving = false;
      fetch(process.env["GASURL"], {
        method: "POST",
        body: JSON.stringify({
          url: process.env["SERVICEURL"] + "/" + randomCharacters,
        }),
      })
        .then((r) => r.json())
        .then((j) => {
          if (!j.success) {
            needsSaving = true;
            console.error(`Error from GAS: ${j.error}`);
          } else {
            console.log("Saved.");
          }
        })
        .catch((e) => console.error(e));
    }
  }, 4000);
}

fetch(process.env["GASURL"])
  .then((r) => r.json())
  .then((j) => {
    const data = j;
    users = data.users || [];
    messages = data.messages || [];
    console.log("Got data.");
    console.log(data);

    main();
  })
  .catch((e) => console.error(e));
