require("dotenv").config();
const express = require("express");
const fs = require("fs");
const http = require("http");
const socketIO = require("socket.io");
const crypto = require("crypto");
const path = require("path");
const version = "v0.11.0";
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
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
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/dist/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/styles.css"));
});
app.get("/" + randomCharacters, (req, res) => {
  console.log("data requested");
  res.send(JSON.stringify({
    chats,
    users,
  }));
});
app.get("/download", (req, res) => {
  const html = String(
    fs.readFileSync(path.join(__dirname, "public/index.html")),
  )
    .replaceAll("io()", `io("${process.env["SERVICEURL"]}")`).replaceAll(
      `rootUrl = ""`,
      `rootUrl = "${process.env["SERVICEURL"]}"`,
    )
    .replaceAll(
      `href="/favicon-512x512.png"`,
      `href="${process.env["SERVICEURL"]}/favicon-512x512.png"`,
    )
    .replaceAll(
      `href="/dist/styles.css"`,
      `href="${process.env["SERVICEURL"]}/dist/styles.css"`,
    );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="chat_${version}.html"`,
  );
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

let needsSaving = false;
let users = [];
let chats = [];

let activeConnections = new Map();

function createChat(name, creatorId, creatorUsername) {
  const newChat = {
    id: generateChatId(),
    name: name,
    admin: {
      id: creatorId,
      username: creatorUsername,
    },
    participants: [creatorId],
    participantsUsernames: [{
      username: creatorUsername,
      id: creatorId,
    }],
    participantsLastMessageTimestamp: {},
    messages: [],
    created: Date.now(),
  };
  newChat.participantsLastMessageTimestamp[creatorId] = Date.now();
  chats.push(newChat);
  needsSaving = true;
  return newChat;
}

function deleteChat(chatId, userId, preDeleteFunction) {
  const chatIndex = chats.findIndex((chat) => chat.id === chatId);
  if (chatIndex === -1) return false;

  if (chats[chatIndex].admin.id !== userId) return false;
  preDeleteFunction();
  chats.splice(chatIndex, 1);
  needsSaving = true;
  return true;
}

function addUserToChat(chatId, userAdding, addedByUser) {
  const chat = chats.find((c) => c.id === chatId);
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

  addServerMessage({
    chatId: chatId,
    action: "add_user",
    userActed: userAdding,
    userActedOn: addedByUser,
  });
  needsSaving = true;

  return {
    success: true,
    chat,
    user: userAdding,
  };
}

function removeUserFromChat(chatId, userToRemove, removedByUser) {
  const userId = userToRemove.id;
  const chat = chats.find((c) => c.id === chatId);
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

    if (chat.participants.length === 0) {
      const chatIndex = chats.findIndex((c) => c.id === chatId);
      chats.splice(chatIndex, 1);
    }

    addServerMessage({
      chatId: chatId,
      action: "remove_user",
      userActed: removedByUser,
      userActedOn: userToRemove,
    });
    needsSaving = true;

    return true;
  }
  return false;
}

function getUserChats(userId) {
  return chats
    .filter((chat) => chat.participants.includes(userId))
    .map((chat) => ({
      id: chat.id,
      name: chat.name,
      admin: chat.admin,
      participants: chat.participants,
      participantsUsernames: chat.participantsUsernames,
      lastMessage: chat.messages[chat.messages.length - 1] || null,
      userLastMessageTimestamp: chat.participantsLastMessageTimestamp[userId],
    }));
}

function getChatMessages(chatId, userId) {
  const chat = chats.find((c) => c.id === chatId);
  if (!chat || !chat.participants.includes(userId)) return null;
  return chat.messages;
}

function generateChatId() {
  return "chat-" + Math.random().toString(36).substring(2, 8);
}

function addServerMessage({ chatId, action, userActed, userActedOn, value }) {
  const chat = chats.find((c) => c.id === chatId);
  if (!chat) {
    return null;
  }
  const newMessage = {
    id: generateMessageId(),
    type: "chat",
    action,
    userActed,
    userActedOn,
    value,
    timestamp: Date.now(),
  };

  chat.messages.push(newMessage);
  needsSaving = true;

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

function addMessage(chatId, message, attachment, senderId) {
  const chat = chats.find((c) => c.id === chatId);
  if (!chat || !chat.participants.includes(senderId)) return null;

  const newMessage = {
    id: generateMessageId(),
    type: "user",
    message: message.slice(0, 250),
    senderId,
    username: users.find((u) => u.id === senderId)?.username,
    timestamp: Date.now(),
  };
  if (attachment) {
    if (attachment.fileName && attachment.uploadedFile && attachment.mimeType) {
      const maxSizeInBytes = 1 * 1024 * 1024;
      if (attachment.uploadedFile.size > maxSizeInBytes) {
        return;
      }
      const base64String = Buffer.from(attachment.uploadedFile).toString(
        "base64",
      );
      const dataUrl = `data:${attachment.mimeType};base64,${base64String}`;
      newMessage.attachment = {
        fileName: attachment.fileName,
        uploadedFile: dataUrl,
      };
    }
  }

  chat.participantsLastMessageTimestamp[senderId] = Date.now();

  chat.messages.push(newMessage);

  needsSaving = true;

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
  const existingUser = users.find((u) => u.username === username);
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
  const newUser = {
    id: generateUserId(),
    username,
    password: hashPassword(password),
    creationTime: Date.now(),
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

function generateMessageId() {
  return "msg-" + Math.random().toString(36).substring(2, 8);
}

function deleteUser(userId) {
  const user = users.find((user) => user.id === userId);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userId && user && userIndex > -1) {
    users.splice(userIndex, 1);
    needsSaving = true;

    chats.filter((chat) => chat.participants.includes(userId)).forEach(
      (chat) => {
        const isAdmin = chat.admin.id === userId;
        if (isAdmin) {
          deleteChat(chat.id, userId, () => {
            addServerMessage({
              chatId: chat.id,
              action: "account_delete",
              userActed: user,
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
      },
    );
    return true;
  }
  return false;
}

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("version", version);

  socket.on("register", (data) => {
    const {
      username,
      password,
    } = data;
    const newUser = registerUser(username, password);
    if (newUser) {
      socket.user = newUser;
      socket.emit("registered", newUser);

      const userChats = getUserChats(newUser.id);
      socket.emit("chats_list", userChats);
    } else {
      socket.emit("registration_failed");
    }
  });

  socket.on("login", (data) => {
    const {
      username,
      password,
    } = data;
    const user = authenticateUser(username, password);
    if (user) {
      socket.user = user;
      socket.emit("authenticated", user);

      const userChats = getUserChats(user.id);
      socket.emit("chats_list", userChats);
    } else {
      socket.emit("authentication_failed");
    }
  });

  socket.on("create_chat", (data) => {
    if (!socket.user) return socket.emit("chat_failed_to_create");
    const {
      name,
    } = data;
    const newChat = createChat(
      name.slice(0, 30),
      socket.user.id,
      socket.user.username,
    );
    addServerMessage({
      chatId: newChat.id,
      action: "create_chat",
      userActed: socket.user,
      value: name,
    });

    socket.emit("chat_created", newChat);
    const userChats = getUserChats(socket.user.id);
    socket.emit("chats_list", userChats);
  });

  socket.on("to_home", () => {
    const prevConnection = activeConnections.get(socket.id);
    if (prevConnection) {
      socket.leave(prevConnection.chatId);
      activeConnections.delete(socket.id);
    }
  });

  socket.on("join_chat", (data) => {
    if (!socket.user) return;
    const {
      chatId,
    } = data;

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
    const {
      message,
      attachment,
    } = data;

    const connection = activeConnections.get(socket.id);
    if (!connection) return;

    addMessage(connection.chatId, message, attachment, socket.user.id);
  });

  socket.on("add_user_to_chat", (data) => {
    if (!socket.user) return;
    const {
      chatId,
      userId,
    } = data;
    const userAdding = users.find((u) => u.id === userId);
    if (!userAdding) {
      return socket.emit("add_user_failed");
    }
    const result = addUserToChat(chatId, userAdding, socket.user);
    const chat = chats.find((c) => c.id === chatId);

    if (result.success && chat) {
      socket.emit("user_added", {
        chatId,
        chat,
        user: result.user,
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
    const {
      newName,
      chatId,
    } = data;
    const chat = chats.find((c) => c.id === chatId);
    if (chat && newName) {
      if (chat.participants.includes(socket.user.id)) {
        const oldChatName = chat.name;
        chat.name = newName.slice(0, 30);
        addServerMessage({
          chatId: chatId,
          action: "change_chat_name",
          userActed: socket.user,
          value: [oldChatName, chat.name],
        });
        needsSaving = true;
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
    const {
      chatId,
    } = data;

    const chat = chats.find((c) => c.id === chatId);
    if (!chat) {
      return socket.emit("delete_chat_failed");
    }
    const participants = chat.participants;
    if (
      deleteChat(chatId, socket.user.id, () => {
        addServerMessage({
          chatId: chatId,
          action: "delete_chat",
          userActed: socket.user,
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
    const {
      chatId,
    } = data;
    const chat = chats.find((c) => c.id === chatId);
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
    const {
      chatId,
      userIdToRemove,
    } = data;
    const chat = chats.find((c) => c.id === chatId);
    const participants = chat?.participants;
    const userToRemove = users.find((u) => u.id === userIdToRemove);
    if (!userToRemove) {
      return socket.emit("remove_user_failed", {
        user: userToRemove,
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
          user: userToRemove,
          chatId,
        });
      }
    } else {
      socket.emit("remove_user_failed", {
        user: userToRemove,
        chatId,
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
  }, process.env["SAVEINTERVAL"] || 5000);
}

fetch(process.env["GASURL"])
  .then((r) => r.json())
  .then((j) => {
    const data = j;
    users = data.users || [];
    chats = data.chats || [];
    console.log("Got data.");
    console.log(data);

    main();
  })
  .catch((e) => console.error(e));
