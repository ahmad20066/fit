const { DataTypes } = require("sequelize")
const sequelize = require("../index");
const Chat = require("./chat");
const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: 'id',
        },
    },
    chat_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Chat,
            key: 'id',
        },
    },
});
module.exports = Message