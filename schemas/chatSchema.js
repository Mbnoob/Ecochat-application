const { Schema, model }  = require('mongoose');

const userChats = new Schema({
    tokens:{
        type: String,
        unique: true,
        required: true
    },
    Allmessages: [
        {
            senderId: String,
            senderName: String,
            reciverId: String,
            Recivername: String,
            messages: String,
            time: String,
            images: String
        }
    ]
}, {
    timestamps: true
})

const chat = model('Userschat', userChats);
module.exports = chat;