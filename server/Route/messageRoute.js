const express = require("express");
const {
  createMessage,
  getMessage,
} = require("../Controller/messageController");
const route = express.Router();

route.post("/create", createMessage);
route.get("/get", getMessage);
module.exports = route;
