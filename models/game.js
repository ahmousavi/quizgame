const mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    opponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    playerTurn: {
        type: Boolean,
        default: true,
    },
    gameState: {
        type: String,
        default: "WAITING",
        trim: true,
    },
    playerScore: {
        type: Number,
        default: 0,
    },
    opponentScore: {
        type: Number,
        default: 0,
    },
    turnsScore: {
        type: Array,
        default: [],
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
})

module.exports = mongoose.model('Game', gameSchema)