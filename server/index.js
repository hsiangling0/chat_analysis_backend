const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./Route/userRoute");
const chatRoute = require("./Route/chatRoute");
const messageRoute = require("./Route/messageRoute");
const app = express();
const corsOptions = {
  origin: ["http://172.28.2.48:3000", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};
require("dotenv").config();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/users", userRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
app.get("/", (req, res) => {
  res.send("Welcome");
});
const port = process.env.PORT || 8000;
const url = process.env.MONGODB_URL || "";
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

mongoose
  .connect(url)
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
