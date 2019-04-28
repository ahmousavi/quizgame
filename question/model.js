const mongoose = require('mongoose')

var questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    // the correct answer
    answer: {
        type: String,
        required: true,
        trim: true,
    },
    // the other options
    choices: {
        type: Array,
        required: true,
        maxlength: 3,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    // noumber of positive vote to this question (when doesn't published yet)
    votes: {
        type: Number,
        default: 0,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    removed: {
        type: Boolean,
        default: false,
    },
    // how many time was shown
    played: {
        type: Number,
        default: 0,
    },
    // how many time players choose correct answer
    correct: {
        type: Number,
        default: 0,
    },
    // average score from player feedback
    rating: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
{
    timestamps: { createdAt: true, updatedAt: false },
})

module.exports = mongoose.model('Question', questionSchema)