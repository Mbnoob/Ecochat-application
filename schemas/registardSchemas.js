const { Schema, model } = require('mongoose');

const userRegistard = new Schema({
    fullName : String,
    email_id : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password : String,
    is_online: {
        type: Boolean,
        default: 0
    },
    socket_id: {
        type: String,
        default: 0,
        unique: true
    },
    profile_picture: [
        {
            file_name: String,
            file_size: String,
            file_path: String,
        }
    ]
},
    {timestamps: true}
)

const registardSchema = model('regstardUsers', userRegistard);
module.exports = registardSchema;