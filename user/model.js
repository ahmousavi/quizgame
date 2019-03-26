const mongoose = require('mongoose')
var User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    token: {
        type: String,
        default: "",
        // unique: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    level: {
        type: Number,
        default: 1,
    },
    gamesPlayed: {
        type: Number,
        default: 0,
    },
    gamesWon: {
        type: Number,
        default: 0,
    },
    gamesLose: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
    activeGames: {
        type: Number,
        default: 0
    },
}, 
{
    timestamps: { createdAt: true, updatedAt: false },
    // collation: 'users',
})
module.exports = mongoose.model('User', User)