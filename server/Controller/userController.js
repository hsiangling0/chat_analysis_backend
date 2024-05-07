const userModel = require("../DB_Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwt_key = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwt_key, { expiresIn: "2d" });
};
const registerUser = async (req, res) => {
  const { name, password } = req.query;
  try {
    let existUser = await userModel.findOne({ name });
    if (existUser)
      return res.status(400).json("This user name already exist...");
    user = new userModel({ name, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, token });
  } catch (e) {
    res.status(500).json(e);
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);
  const { name, password } = req.query;
  try {
    let user = await userModel.findOne({ name });
    if (!user) return res.status(400).json("Invalid user name or password...");
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd)
      return res.status(400).json("Invalid user name or password...");
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, token });
  } catch (e) {
    res.status(500).json(e);
  }
};

const findUser = async (req, res) => {
  const userID = req.query.userID;
  try {
    const user = await userModel.findById(userID);
    console.log(user);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};
const findUserName = async (req, res) => {
  const name = req.query.userName;
  console.log(name);
  try {
    const user = await userModel.findOne({ name });
    if (!user) return res.status(400).json("Invalid user name...");
    console.log(user._id);
    res.status(200).json({ _id: user._id });
  } catch (e) {
    res.status(500).json(e);
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = { registerUser, loginUser, findUser, getUsers, findUserName };
