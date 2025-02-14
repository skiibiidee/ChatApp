require("dotenv").config();
const express = require("express");
const fs = require("fs");
const http = require("http");
const socketIO = require("socket.io");
const crypto = require("crypto");
const path = require("path");
const version = "v0.17.0";
const admin = require("firebase-admin");
const serviceAccountJson = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
  "base64",
).toString("utf8");
const firebaseUrl = process.env.FIREBASE_URL;
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
  databaseURL: firebaseUrl,
});
const db = admin.database();
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const randomCharacters = [...Array(32)]
  .map(() => Math.floor(Math.random() * 16).toString(16))
  .join("");

console.log(randomCharacters);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send(fs.path.join(__dirname, "public/index.html"));
});

app.get("/changelog.md", (req, res) => {
  res.sendFile(path.join(__dirname, "CHANGELOG.md"));
});
app.get("/game", (req, res) => {
  res.send(JSON.stringify({ url: process.env.GAMEURL }));
});

// Endpoint to get statistics
app.get("/api/stats", (req, res) => {
  res.json({
    currentUserCount: activeConnections.size,
    totalChats: Object.keys(chats).length,
    totalUsers: Object.keys(users).length,
    totalAttachments: Object.keys(attachments).length,
    messageCount,
  });
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/other/dash.html");
});

app.get("/" + randomCharacters, (req, res) => {
  console.log("data requested");
  res.send(
    JSON.stringify({
      chats,
      users,
      attachments,
      profilePictures,
      chatPictures,
    }),
  );
});
app.get("/download", (req, res) => {
  const html = String(
    fs.readFileSync(path.join(__dirname, "public/index.html")),
  )
    .replaceAll("io()", `io("${process.env["SERVICEURL"]}")`)
    .replaceAll(`rootUrl = ""`, `rootUrl = "${process.env["SERVICEURL"]}"`)
    .replaceAll(
      `href="/favicon-512x512.png"`,
      `href="${process.env["SERVICEURL"]}/favicon-512x512.png"`,
    )
    .replaceAll(
      `href="/dist/styles.css"`,
      `href="${process.env["SERVICEURL"]}/dist/styles.css"`,
    )
    .replaceAll(
      `src="/script.js"`,
      `src="${process.env["SERVICEURL"]}/script.js"`,
    );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="chat_${version}.html"`,
  );
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/attachment/:index", (req, res) => {
  // Base64 string including the "data:" prefix
  if (attachments[req.params.index] === undefined) {
    res.sendStatus(404);
    return;
  }
  const base64Data = Buffer.from(attachments[req.params.index].data, "base64");
  const contentType = attachments[req.params.index].mime;

  res.setHeader("Content-Type", contentType); // Optional, as you're sending raw data
  res.send(base64Data); // Send the base64 data directly
});

app.get("/file/:index", (req, res) => {
  if (attachments[req.params.index] === undefined) {
    res.sendStatus(404);
    return;
  }
  res.send(
    `<!DOCTYPE html><html><body style="padding:0px;margin:0px;overflow:hidden"><iframe id="iframehtml5" class="" src="/attachment/${req.params.index}" style="width:100vw;height:100vh;margin:0px;" title="" frameborder="0" border="0" scrolling="auto" data-wg-content="true" sandbox="allow-forms allow-scripts" allowfullscreen></iframe></body></html>`,
  );
});

app.get("/pfp/:index", (req, res) => {
  // Base64 string including the "data:" prefix
  if (profilePictures[req.params.index] === undefined) {
    res.setHeader("Content-Type", "image/png");
    res.send(fs.readFileSync(path.join(__dirname, "public/profile.png")));
    return;
  }
  const base64Data = Buffer.from(
    profilePictures[req.params.index].data,
    "base64",
  );
  const contentType = profilePictures[req.params.index].mime;

  res.setHeader("Content-Type", contentType); // Optional, as you're sending raw data
  res.send(base64Data); // Send the base64 data directly
});

app.get("/chatpicture/:index", (req, res) => {
  // Base64 string including the "data:" prefix
  if (chatPictures[req.params.index] === undefined) {
    res.setHeader("Content-Type", "image/png");
    res.send(fs.readFileSync(path.join(__dirname, "public/chat.png")));
    return;
  }
  const base64Data = Buffer.from(chatPictures[req.params.index].data, "base64");
  const contentType = chatPictures[req.params.index].mime;

  res.setHeader("Content-Type", contentType); // Optional, as you're sending raw data
  res.send(base64Data); // Send the base64 data directly
});

let users = {};
let chats = {};
let attachments = {};
let profilePictures = {};
let chatPictures = {};

let messageCount = 0;
let activeConnections = new Map();

async function saveData(dir, id, data) {
  const ref = db.ref(`${dir}/${id}`);
  await ref.set(data);
}

async function deleteData(dir, id) {
  const ref = db.ref(`${dir}/${id}`);
  ref.remove();
}

function getAttachmentIndex() {
  let index = "attachment-" + Math.random().toString(36).substring(2, 8);
  while (Object.keys(attachments).includes(index)) {
    index = "attachment-" + Math.random().toString(36).substring(2, 8);
  }
  return index;
}

function createChat(name, creatorId, creatorUsername) {
  const chatId = generateChatId();
  const newChat = {
    id: chatId,
    name: name,
    admin: {
      id: creatorId,
      username: creatorUsername,
    },
    participants: [creatorId],
    participantsUsernames: [
      {
        username: creatorUsername,
        id: creatorId,
      },
    ],
    participantsLastMessageTimestamp: {},
    participantsUnread: {},
    messages: [],
    created: Date.now(),
  };
  Object.keys(newChat).forEach((key) =>
    newChat[key] === undefined ? delete newChat[key] : {}
  );
  newChat.participantsUnread[creatorId] = 0;
  newChat.participantsLastMessageTimestamp[creatorId] = Date.now();
  chats[chatId] = newChat;
  addServerMessage({
    chatId: newChat.id,
    action: "create_chat",
    userActed: { id: creatorId, username: creatorUsername },
    value: name,
  });
  saveData("chats", chatId, newChat);
  return newChat;
}

function deleteChat(chatId, userId, preDeleteFunction) {
  if (!chats[chatId]) return false;

  if (chats[chatId].admin.id !== userId) return false;
  preDeleteFunction();
  chats[chatId].messages.forEach((message) => {
    if (message.attachment) {
      delete attachments[message.attachment.data];
    }
  });
  delete chatPictures[chatId];
  delete chats[chatId];
  deleteData("chatPictures", chatId);
  deleteData("chats", chatId);
  return true;
}

function addUserToChat(chatId, userAdding, addedByUser) {
  const chat = chats[chatId];
  if (!chat) {
    return {
      success: false,
      error: "Chat not found",
    };
  }

  if (!chat.participants.includes(addedByUser.id)) {
    return {
      success: false,
      error: "Not authorized",
    };
  }

  if (chat.participants.includes(userAdding.id)) {
    return {
      success: false,
      error: "User already in chat",
    };
  }

  chat.participants.push(userAdding.id);
  chat.participantsUsernames.push({
    id: userAdding.id,
    username: userAdding.username,
  });

  chat.participantsLastMessageTimestamp[userAdding.id] = Date.now();
  chat.participantsLastMessageTimestamp[addedByUser.id] = Date.now();

  if (!chat.participantsUnread) {
    chat.participantsUnread = {};
  }

  chat.participantsUnread[userAdding.id] = 0;
  chat.participantsUnread[addedByUser.id] = 0;

  addServerMessage({
    chatId: chatId,
    action: "add_user",
    userActed: { id: addedByUser.id, username: addedByUser.username },
    userActedOn: { id: userAdding.id, username: userAdding.username },
  });
  saveData("chats", chatId, chat);

  return {
    success: true,
    chat,
    user: { id: userAdding.id, username: userAdding.username },
  };
}

function removeUserFromChat(chatId, userToRemove, removedByUser) {
  const userId = userToRemove.id;
  const chat = chats[chatId];
  if (!chat) return false;

  if (userId === removedByUser.id) {
    if (chat.admin.id === removedByUser.id) {
      return false;
    }
  } else {
    if (chat.admin.id !== removedByUser.id) {
      return false;
    }
  }

  const index = chat.participants.indexOf(userId);
  if (index > -1) {
    chat.participants.splice(index, 1);
    chat.participantsUsernames.splice(index, 1);
    delete chat.participantsLastMessageTimestamp[userId];
    if (chat.participantsUnread) {
      delete chat.participantsUnread[userId];
    }

    if (chat.participants.length === 0) {
      delete chats[chatId];
    }

    addServerMessage({
      chatId: chatId,
      action: "remove_user",
      userActed: { id: removedByUser.id, username: removedByUser.username },
      userActedOn: { id: userToRemove.id, username: userToRemove.username },
    });
    saveData("chats", chatId, chat);

    return true;
  }
  return false;
}

function getUserChats(userId) {
  return Object.values(chats)
    .filter((chat) => chat.participants.includes(userId))
    .map((chat) => ({
      id: chat.id,
      name: chat.name,
      admin: chat.admin,
      participants: chat.participants,
      participantsUsernames: chat.participantsUsernames,
      lastMessage: chat.messages[chat.messages?.length - 1] || null,
      userLastMessageTimestamp: chat.participantsLastMessageTimestamp[userId] ||
        0,
      userUnread: chat.participantsUnread
        ? Object.keys(chat.participantsUnread).includes(userId)
          ? chat.participantsUnread[userId]
          : 0
        : 0,
    }));
}

function getChatMessages(chatId, userId) {
  const chat = chats[chatId];
  if (!chat || !chat.participants.includes(userId)) return null;
  return chat.messages;
}

function generateChatId() {
  let chatId = "chat-" + Math.random().toString(36).substring(2, 8);
  while (chats[chatId]) {
    chatId = "chat-" + Math.random().toString(36).substring(2, 8);
  }
  return chatId;
}

function addServerMessage({ chatId, action, userActed, userActedOn, value }) {
  const chat = chats[chatId];
  if (!chat) {
    return null;
  }
  const newMessage = {
    id: generateMessageId(chat),
    type: "chat",
    action,
    userActed,
    userActedOn,
    value,
    timestamp: Date.now(),
  };
  Object.keys(newMessage).forEach((key) =>
    newMessage[key] === undefined ? delete newMessage[key] : {}
  );

  chat.messages.push(newMessage);
  saveData("chats", chatId, chat);

  const chatConnections = Array.from(activeConnections.entries())
    .filter(([, data]) => data.chatId === chatId)
    .map(([socketId]) => socketId);

  chatConnections.forEach((socketId) => {
    io.to(socketId).emit("message_received", {
      chatId,
      message: newMessage,
    });
  });

  return newMessage;
}

function addMessage(chatId, message, attachment, senderId, reply = null) {
  const chat = chats[chatId];
  if (!chat || !chat.participants.includes(senderId)) return null;

  const newMessage = {
    id: generateMessageId(chat),
    type: "user",
    message: message.slice(0, 250),
    senderId,
    username: users[senderId]?.username,
    timestamp: Date.now(),
    reply,
  };

  if (attachment) {
    if (
      attachment.fileName &&
      attachment.uploadedFile &&
      attachment.mimeType
    ) {
      const maxSizeInBytes = 1 * 1024 * 1024;
      if (attachment.uploadedFile.size > maxSizeInBytes) {
        return;
      }
      const base64String = Buffer.from(attachment.uploadedFile).toString(
        "base64",
      );
      const index = getAttachmentIndex();
      attachments[index] = {
        fileName: attachment.fileName,
        data: base64String,
        mime: attachment.mimeType,
      };
      saveData("attachments", index, attachments[index]);
      newMessage.attachment = {
        data: index,
        fileName: attachment.fileName,
        mime: attachment.mimeType,
      };
    }
  }

  chat.participantsLastMessageTimestamp[senderId] = Date.now();
  if (!chat.participantsUnread) {
    chat.participantsUnread = {};
  }
  chat.participants.forEach((participantID) => {
    if (chat.participantsUnread[participantID]) {
      chat.participantsUnread[participantID]++;
    } else {
      chat.participantsUnread[participantID] = 1;
    }
    chat.participantsUnread[senderId] = 0;
  });

  chat.messages.push(newMessage);
  saveData("chats", chatId, chat);

  const chatConnections = Array.from(activeConnections.entries())
    .filter(([, data]) => data.chatId === chatId)
    .map(([socketId]) => socketId);

  chatConnections.forEach((socketId) => {
    io.to(socketId).emit("message_received", {
      chatId,
      message: newMessage,
    });
  });

  io.sockets.sockets.forEach((s) => {
    if (s.user && chat.participants.includes(s.user.id)) {
      const userChats = getUserChats(s.user.id);
      s.emit("chats_list", userChats);
    }
  });

  return newMessage;
}

function registerUser(username, password) {
  const existingUser = Object.values(users).find((u) =>
    u.username === username
  );
  if (existingUser) {
    return null;
  }
  const tooLong = username.length > 32 || password.length > 32;
  if (tooLong) {
    return null;
  }
  const tooShort = username.length < 4;
  if (tooShort) {
    return false;
  }
  const illegalUser = [].includes(username);
  if (illegalUser) {
    return null;
  }
  const userId = generateUserId();
  const newUser = {
    id: userId,
    username,
    password: hashPassword(password),
    creationTime: Date.now(),
    private: false,
  };
  users[userId] = newUser;
  saveData("users", userId, newUser);
  return newUser;
}

function authenticateUser(username, password) {
  const user = Object.values(users).find((u) => u.username === username);
  if (
    user &&
    (user.password === hashPassword(password) || user.password === password)
  ) {
    return user;
  }
  return null;
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateUserId() {
  let userId = "user-" + Math.random().toString(36).substring(2, 8);
  while (users[userId]) {
    userId = "user-" + Math.random().toString(36).substring(2, 8);
  }
  return userId;
}

function generateMessageId(chat) {
  let msgId = "message-" + Math.random().toString(36).substring(2, 8);
  while (chat.messages.findIndex((msg) => msg.id === msgId) >= 0) {
    msgId = "message-" + Math.random().toString(36).substring(2, 8);
  }
  return msgId;
}

function setProfilePicture(file, mime, userId) {
  profilePictures[userId] = {
    data: Buffer.from(file).toString("base64"),
    mime: mime,
  };
  saveData("profilePictures", userId, profilePictures[userId]);
  return true;
}

function setChatPicture(file, mime, chatId) {
  chatPictures[chatId] = {
    data: Buffer.from(file).toString("base64"),
    mime: mime,
  };
  saveData("chatPictures", chatId, chatPictures[chatId]);
  return true;
}

function deleteUser(userId) {
  const user = users[userId];
  if (user) {
    delete users[userId];
    delete profilePictures[userId];
    deleteData("users", userId);
    deleteData("profilePictures", userId);

    Object.values(chats)
      .filter((chat) => chat.participants.includes(userId))
      .forEach((chat) => {
        const isAdmin = chat.admin.id === userId;
        if (isAdmin) {
          deleteChat(chat.id, userId, () => {
            addServerMessage({
              chatId: chat.id,
              action: "account_delete",
              userActed: { id: user.id, username: user.username },
            });
          });
        } else {
          const removed = removeUserFromChat(chat.id, user, user);
          if (removed) {
            if (chat) {
              io.sockets.sockets.forEach((s) => {
                if (s.user && chat.participants.includes(s.user.id)) {
                  const userChats = getUserChats(s.user.id);
                  s.emit("chats_list", userChats);
                }
              });
            }
          }
        }
      });
    return true;
  }
  return false;
}

function deleteMessage(chatId, messageId, userId) {
  const chat = chats[chatId];
  if (!chat) return false;

  const messageIndex = chat.messages.findIndex((m) => m.id === messageId);
  if (messageIndex === -1) return false;

  const message = chat.messages[messageIndex];
  if (message.senderId !== userId) return false;

  // Delete any attachments associated with the message
  if (message.attachment) {
    delete attachments[message.attachment.data];
    deleteData("attachments", message.attachment.data);
  }

  // Remove the message
  chat.messages.splice(messageIndex, 1);

  chat.messages.forEach((msg) => {
    if (msg.reply === messageId) {
      msg.reply = "deleted";
    }
  });
  saveData("chats", chatId, chat);
  return true;
}

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("version", version);

  socket.on("register", (data) => {
    const { username, password } = data;
    const newUser = registerUser(username, password);
    if (newUser) {
      socket.user = newUser;
      socket.emit("registered", {
        id: newUser.id,
        username: newUser.username,
        password: newUser.password,
        creationTime: newUser.creationTime,
        private: newUser.private,
      });

      const userChats = getUserChats(newUser.id);
      socket.emit("chats_list", userChats);
    } else {
      socket.emit("registration_failed");
    }
  });

  socket.on("login", (data) => {
    const { username, password } = data;
    const user = authenticateUser(username, password);
    if (user) {
      socket.user = user;
      socket.emit("authenticated", {
        id: user.id,
        username: user.username,
        password: user.password,
        creationTime: user.creationTime,
        private: user.private,
      });

      const userChats = getUserChats(user.id);
      socket.emit("chats_list", userChats);
    } else {
      socket.emit("authentication_failed");
    }
  });

  socket.on("set_private", (data, callback) => {
    if (!socket.user) return;
    if (data.private === undefined) return;
    const { private } = data;
    socket.user.private = private;
    saveData("users", socket.user.id, socket.user);
    callback(socket.user);
  });

  socket.on("set_profile_picture", ({ file, mime }) => {
    if (!socket.user) return;
    if (!mime.startsWith("image/")) return;
    if (setProfilePicture(file, mime, socket.user.id)) {
      socket.emit("profile_set");
    }
  });

  socket.on("set_chat_picture", ({ file, mime, chatId }) => {
    if (!socket.user) return;
    if (!mime.startsWith("image/")) return;
    const chat = chats[chatId];
    if (!chat || !chat.participants.includes(socket.user.id)) return;

    if (setChatPicture(file, mime, chatId)) {
      socket.emit("chat_picture_set");
    }
  });

  socket.on("read_chat", ({ chatId }) => {
    if (!socket.user) return;
    const chat = chats[chatId];
    if (chat) {
      if (!chat.participantsUnread) {
        chat.participantsUnread = {};
      }
      chat.participantsUnread[socket.user.id] = 0;
      saveData("chats", chatId, chat);

      io.sockets.sockets.forEach((s) => {
        if (s.user && s.user.id === socket.user.id) {
          const userChats = getUserChats(socket.user.id);
          s.emit("chats_list", userChats);
        }
      });
    }
  });

  socket.on("get_message_by_id", ({ chatId, messageId }, callback) => {
    if (!socket.user) return callback({ error: "User not authenticated" });

    const chat = chats[chatId];
    if (!chat) return callback({ error: "Chat not found" });

    const message = chat.messages.find((msg) => msg.id === messageId);
    if (!message) return callback({ error: "Message not found" });

    callback({ message });
  });

  socket.on("send_sticker", ({ reply, data, fileName }) => {
    if (!socket.user) return;
    const connection = activeConnections.get(socket.id);
    if (!connection) return;
    const chat = chats[connection.chatId];
    if (!chat || !chat.participants.includes(socket.user.id)) return null;

    const newMessage = {
      id: generateMessageId(chat),
      type: "user",
      sticker: { data: data, fileName: fileName },
      senderId: socket.user.id,
      username: socket.user.username,
      timestamp: Date.now(),
      reply,
    };

    chat.participantsLastMessageTimestamp[socket.user.id] = Date.now();
    chat.participantsUnread[socket.user.id] = 0;

    chat.messages.push(newMessage);
    if (!chat.participantsUnread) {
      chat.participantsUnread = {};
    }
    chat.participants.forEach((participantID) => {
      if (chat.participantsUnread[participantID]) {
        chat.participantsUnread[participantID]++;
      } else {
        chat.participantsUnread[participantID] = 1;
      }
      chat.participantsUnread[socket.user.id] = 0;
    });
    saveData("chats", connection.chatId, chat);

    const chatConnections = Array.from(activeConnections.entries())
      .filter(([, data]) => data.chatId === connection.chatId)
      .map(([socketId]) => socketId);

    chatConnections.forEach((socketId) => {
      io.to(socketId).emit("message_received", {
        chatId: connection.chatId,
        message: newMessage,
      });
    });
    io.sockets.sockets.forEach((s) => {
      if (s.user && chat.participants.includes(s.user.id)) {
        const userChats = getUserChats(s.user.id);
        s.emit("chats_list", userChats);
      }
    });

    return newMessage;
  });
  socket.on("make_sticker", ({ file, mime, fileName }) => {
    if (!socket.user) return;
    if (!mime.startsWith("image/")) return;
    const index = getAttachmentIndex();
    attachments[index] = {
      fileName: fileName,
      data: Buffer.from(file).toString("base64"),
      mime: mime,
    };
    saveData("attachments", index, attachments[index]);
    socket.emit("sticker_created", { data: index, fileName });
  });
  socket.on("search_user", ({ query }, callback) => {
    if (!socket.user) return;
    if (query.length < 4) return callback([]);
    const found = Object.values(users)
      .filter((u) => {
        return (
          u.username.toLowerCase().includes(query.toLowerCase()) && !u.private
        );
      })
      .slice(0, 250)
      .map((user) => {
        return {
          username: user.username,
          id: user.id,
          creationTime: user.creationTime,
        };
      });

    callback(found);
  });

  socket.on("create_chat", (data) => {
    if (!socket.user) return socket.emit("chat_failed_to_create");
    const { name } = data;
    const newChat = createChat(
      name.slice(0, 30),
      socket.user.id,
      socket.user.username,
    );

    socket.emit("chat_created", newChat);
    const userChats = getUserChats(socket.user.id);
    socket.emit("chats_list", userChats);
  });

  socket.on("to_home", () => {
    if (!socket.user) return;
    const prevConnection = activeConnections.get(socket.id);
    if (prevConnection) {
      socket.leave(prevConnection.chatId);
      activeConnections.delete(socket.id);
    }
  });

  socket.on("join_chat", (data) => {
    if (!socket.user) return;
    const { chatId } = data;

    const prevConnection = activeConnections.get(socket.id);
    if (prevConnection) {
      socket.leave(prevConnection.chatId);
    }

    socket.join(chatId);
    activeConnections.set(socket.id, {
      userId: socket.user.id,
      chatId,
    });

    const messages = getChatMessages(chatId, socket.user.id);
    if (messages) {
      socket.emit("chat_messages", {
        chatId,
        messages,
      });
    }
  });

  socket.on("send_message", (data) => {
    if (!socket.user) return;
    const { message, attachment, reply } = data;
    const connection = activeConnections.get(socket.id);
    if (!connection) return;
    addMessage(connection.chatId, message, attachment, socket.user.id, reply);
  });

  socket.on("add_user_to_chat", (data) => {
    if (!socket.user) return;
    const { chatId, userId } = data;
    const userAdding = users[userId];
    if (!userAdding) {
      return socket.emit("add_user_failed");
    }
    const result = addUserToChat(chatId, userAdding, socket.user);
    const chat = chats[chatId];

    if (result.success && chat) {
      socket.emit("user_added", {
        chatId,
        chat,
        user: { id: result.user.id, username: result.user.username },
      });
      io.sockets.sockets.forEach((s) => {
        if (s.user && chat.participants.includes(s.user.id)) {
          const userChats = getUserChats(s.user.id);
          s.emit("chats_list", userChats);
        }
      });
    } else {
      socket.emit("add_user_failed");
    }
  });
  socket.on("edit_chat_name", (data) => {
    const { newName, chatId } = data;
    const chat = chats[chatId];
    if (chat && newName) {
      if (chat.participants.includes(socket.user.id)) {
        const oldChatName = chat.name;
        chat.name = newName.slice(0, 30);
        addServerMessage({
          chatId: chatId,
          action: "change_chat_name",
          userActed: { id: socket.user.id, username: socket.user.username },
          value: [oldChatName, chat.name],
        });
        saveData("chats", chatId, chat);
        io.sockets.sockets.forEach((s) => {
          if (s.user && chat.participants.includes(s.user.id)) {
            const userChats = getUserChats(s.user.id);
            s.emit("chats_list", userChats);
          }
        });
        socket.emit("chat_name_edited");
        return;
      }
    }
    socket.emit("chat_name_editing_failed");
    return;
  });

  socket.on("delete_chat", (data) => {
    if (!socket.user) return;
    const { chatId } = data;

    const chat = chats[chatId];
    if (!chat) {
      return socket.emit("delete_chat_failed");
    }
    if (
      deleteChat(chatId, socket.user.id, () => {
        addServerMessage({
          chatId: chatId,
          action: "delete_chat",
          userActed: { id: socket.user.id, username: socket.user.username },
        });
      })
    ) {
      io.sockets.sockets.forEach((s) => {
        if (s.user && chat.participants.includes(s.user.id)) {
          const userChats = getUserChats(s.user.id);
          s.emit("chats_list", userChats);
        }
      });

      socket.emit("chat_deleted", {
        chatId,
      });
    } else {
      socket.emit("delete_chat_failed");
    }
  });
  socket.on("leave_chat", (data) => {
    if (!socket.user) return;
    const { chatId } = data;
    const chat = chats[chatId];
    if (!chat) return;
    const participants = chat.participants;
    if (removeUserFromChat(chatId, socket.user, socket.user)) {
      socket.emit("left_chat", {
        chatId,
      });

      const refreshedChats = getUserChats(socket.user.id);
      socket.emit("chats_list", refreshedChats);

      participants.forEach((userId) => {
        io.sockets.sockets.forEach((s) => {
          if (s.user && s.user.id === userId) {
            const userChats = getUserChats(userId);
            s.emit("chats_list", userChats);
          }
        });
      });

      const prevConnection = activeConnections.get(socket.id);
      if (prevConnection && prevConnection.chatId === chatId) {
        socket.leave(chatId);
        activeConnections.delete(socket.id);
      }
    } else {
      socket.emit("leave_chat_failed");
    }
  });

  socket.on("remove_user_from_chat", (data) => {
    const { chatId, userIdToRemove } = data;
    const chat = chats[chatId];
    const participants = chat?.participants;
    const userToRemove = users[userIdToRemove];
    if (!userToRemove) {
      return socket.emit("remove_user_failed", {
        user: { id: userToRemove.id, username: userToRemove.username },
        chatId,
      });
    }

    const removed = removeUserFromChat(chatId, userToRemove, socket.user);
    if (removed) {
      if (chat && participants) {
        io.sockets.sockets.forEach((s) => {
          if (s.user && participants.includes(s.user.id)) {
            const userChats = getUserChats(s.user.id);
            s.emit("chats_list", userChats);
          }
          if (s?.user?.id === userIdToRemove) {
            const userChats = getUserChats(s.user.id);
            s.emit("chats_list", userChats);
            s.emit("removed_from_chat", {
              chatId,
            });
          }
        });

        socket.emit("user_removed", {
          user: { id: userToRemove.id, username: userToRemove.username },
          chatId,
        });
      }
    } else {
      socket.emit("remove_user_failed", {
        user: { id: userToRemove.id, username: userToRemove.username },
        chatId,
      });
    }
  });

  socket.on("user_lookup", ({ userId }, callback) => {
    const user = users[userId];
    if (user) {
      callback({
        id: user.id,
        username: user.username,
        creationTime: user.creationTime,
      });
    }
  });

  socket.on("delete_account", () => {
    if (socket.user?.id) {
      if (deleteUser(socket.user.id)) {
        socket.emit("account_deleted");
      } else {
        socket.emit("account_failed_to_delete");
      }
    }
  });

  socket.on("delete_message", (data) => {
    if (!socket.user) return;
    const { chatId, messageId } = data;

    if (deleteMessage(chatId, messageId, socket.user.id)) {
      // Notify all users in the chat about the deletion
      const chatConnections = Array.from(activeConnections.entries())
        .filter(([, data]) => data.chatId === chatId)
        .map(([socketId]) => socketId);

      chatConnections.forEach((socketId) => {
        io.to(socketId).emit("message_deleted", {
          chatId,
          messageId,
        });
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    activeConnections.delete(socket.id);
  });
});

function main() {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

(async () => {
  const chatsRef = db.ref("/chats");
  const chatsSnapshot = await chatsRef.once("value");
  chats = chatsSnapshot.val() || {}; // Convert the snapshot to a JavaScript object
  chatsRef.on("value", (snapshot) => {
    const value = snapshot.val();
    if (value !== chats && value !== undefined) {
      chats = value;
    }
    messageCount = Object.values(chats).map((c) => c.messages?.length || 0)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
  });

  const usersRef = db.ref("/users");
  const usersSnapshot = await usersRef.once("value");
  users = usersSnapshot.val() || {}; // Convert the snapshot to a JavaScript object
  usersRef.on("value", (snapshot) => {
    const value = snapshot.val();
    if (value !== users && value !== undefined) {
      users = value;
    }
  });

  const attachmentsRef = db.ref("/attachments");
  const attachmentsSnapshot = await attachmentsRef.once("value");
  attachments = attachmentsSnapshot.val() || {}; // Convert the snapshot to a JavaScript object
  attachmentsRef.on("value", (snapshot) => {
    const value = snapshot.val();
    if (value !== attachments && value !== undefined) {
      attachments = value;
    }
  });

  const profilePicturesRef = db.ref("/profilePictures");
  const profilePicturesSnapshot = await profilePicturesRef.once("value");
  profilePictures = profilePicturesSnapshot.val() || {}; // Convert the snapshot to a JavaScript object
  profilePicturesRef.on("value", (snapshot) => {
    const value = snapshot.val();
    if (value !== profilePictures && value !== undefined) {
      profilePictures = value;
    }
  });

  const chatPicturesRef = db.ref("/chatPictures");
  const chatPicturesSnapshot = await chatPicturesRef.once("value");
  chatPictures = chatPicturesSnapshot.val() || {}; // Convert the snapshot to a JavaScript object
  chatPicturesRef.on("value", (snapshot) => {
    const value = snapshot.val();
    if (value !== chatPictures && value !== undefined) {
      chatPictures = value;
    }
  });

  console.log("Got data.");
  main();
})();
