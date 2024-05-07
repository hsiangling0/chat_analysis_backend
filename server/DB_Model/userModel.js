const mongoose = require("mongoose");

const usrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
      unique: true,
    },
    password: { type: String, required: true, minlength: 1, maxlength: 1024 },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", usrSchema);
module.exports = userModel;
