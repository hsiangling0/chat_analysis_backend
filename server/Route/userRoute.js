const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  findUserName,
} = require("../Controller/userController");
const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/find", findUser);
route.get("/search", findUserName);
route.get("/", getUsers);
module.exports = route;
