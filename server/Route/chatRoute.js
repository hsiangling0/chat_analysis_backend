const express = require("express");
const {
  createChat,
  findChatList,
  findChat,
} = require("../Controller/chatController");
const route = express.Router();

route.post("/create", createChat);
route.get("/list", findChatList);
route.get("/find", findChat);
module.exports = route;
