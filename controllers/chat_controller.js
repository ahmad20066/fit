const Chat = require("../models/chat/chat");
const Message = require("../models/chat/message");
const User = require("../models/user");
exports.sendMessage = async (req, res, next) => {
    try {
        const { coach_id, content } = req.body;
        const user_id = req.userId;

        let chat = await Chat.findOne({
            where: { user_id, coach_id }
        });

        if (!chat) {
            chat = await Chat.create({ user_id, coach_id });
        }

        const message = await Message.create({
            content,
            sender_id: user_id,
            chat_id: chat.id
        });

        res.status(201).json({ message });
    } catch (error) {
        next(error);
    }
};
exports.getMessages = async (req, res, next) => {
    try {
        const { chat_id } = req.params;

        const messages = await Message.findAll({
            where: { chat_id },
            include: [
                { model: User, as: 'sender', attributes: ['id', 'name', 'role'] }
            ],
            order: [['timestamp', 'ASC']]
        });

        res.status(200).json({ messages });
    } catch (error) {
        next(error);
    }
};