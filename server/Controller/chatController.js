const chatModel = require("../DB_Model/chatModel");

const createChat = async (req, res) => {
  const { firstID, secondID } = req.query;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstID, secondID] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new chatModel({ members: [firstID, secondID] });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

const findChatList = async (req, res) => {
  const userID = req.query.userID;
  try {
    const chats = await chatModel.find({ members: { $in: [userID] } });
    res.status(200).json(chats);
  } catch (e) {
    res.status(500).json(e);
  }
};

const findChat = async (req, res) => {
  const { firstID, secondID } = req.query;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstID, secondID] },
    });
    res.status(200).json(chat);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = { createChat, findChatList, findChat };
