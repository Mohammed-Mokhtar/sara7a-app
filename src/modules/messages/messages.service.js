import { User } from "../../database/model/user.model.js";
import { Message } from "../../database/model/message.model.js";

export const sendMessageService = async (req, res) => {
  let { receiverId, content } = req.body;
  const user = await User.findById(receiverId);

  if (!user) return res.json({ message: "user don't exist" });

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  let images = "";

  if (req.files)
    images = req.files.map((el) => `${baseUrl}/uploads/${el.filename}`);

  const addedMessage = await Message.create({ receiverId, content, images });
  res.json({ message: "message sent successfully", addedMessage });
};

export const getMyMessagesService = async (req, res) => {
  const allMessages = await Message.find({ receiverId: req.user._id });

  if (!allMessages.length) return res.json({ message: "no messages found" });

  res.json({ message: "messages found", allMessages });
};

export const getSingleMessageService = async (req, res) => {
  let { messageId } = req.params;

  const message = await Message.findOne({
    receiverId: req.user._id,
    _id: messageId,
  });

  if (!message) return res.json({ message: "no messages found" });

  res.json({ message: "messages found", myMessage: message });
};

export const deleteMessageService = async (req, res) => {
  let { messageId } = req.params;

  const deletedMessage = await Message.findOneAndDelete({
    receiverId: req.user._id,
    _id: messageId,
  });

  if (!deletedMessage) return res.json({ message: "no messages found" });

  res.json({ message: "messages deleted", deletedMessage });
};

