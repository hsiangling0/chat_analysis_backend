const messageModel = require("../DB_Model/messageModel");

const createMessage = async (req, res) => {
  const { chatID, senderID, text } = req.query;
  const message = new messageModel({ chatID, senderID, text });
  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};
const getMessage = async (req, res) => {
  const chatID = req.query.chatID;
  try {
    const message = await messageModel.find({ chatID });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = { createMessage, getMessage };
