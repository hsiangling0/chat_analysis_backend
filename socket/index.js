const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:3000" });
let onlineUser = [];
io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("addUser", (userID) => {
    !onlineUser.some((user) => user.userID == userID) &&
      onlineUser.push({ userID, socketID: socket.id });
    console.log(onlineUser);
  });
  socket.on("sendMessage", (message) => {
    const user = onlineUser.find((user) => user.userID === message.receiverID);
    if (user) {
      io.to(user.socketID).emit("getMessage", message);
      io.to(user.socketID).emit("getNotification", {
        senderID: message.senderID,
        isRead: false,
        date: new Date(),
      });
    }
  });
  socket.on("disconnect", () => {
    onlineUser = onlineUser.filter((user) => user.socketID !== socket.id);
  });
  //socket.on("sendMessage", (message) => {});
});

io.listen(5844);
