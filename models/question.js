const mongoose = require('mongoose')

var questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        required: true,
        trim: true,
    },
    choices: {
        type: Array,
        required: true,
        maxlength: 3,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    confirmed: {
        type: Number,
        default: 0,
    },
    removed: {
        type: Boolean,
        default: false,
    },
    played: {
        type: Number,
        default: 0,
    },
    correct: {
        type: Number,
        default: 0,
    },
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