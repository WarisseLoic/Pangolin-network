const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: false,
        minlength: 3
    },
    age: {
        type: Number,
        required: false,
        default: -1
    },
    familly: {
        type: String,
        required: false,
        default: "none"
    },
    race: {
        required: true,
        type: String,
        required: false,
        default: "none"
    },
    origin: {
        type: String,
        default: "none",
        required: false
    },
    description: {
        type: String,
        default: "none",
        required: false
    },
    friends: {
        type: Array,
        required: false,
        default: []
    }
})

module.exports = mongoose.model('users', userSchema);