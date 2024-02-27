const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        
    },
})
const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel 