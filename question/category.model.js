const mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    // title (display name) of the category
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    // number of questions in this category
    count: {
        type: Number,
        default: 0,
    },
},
{
    timestamps: { createdAt: true, updatedAt: false },
})

module.exports = mongoose.model('Category', categorySchema)