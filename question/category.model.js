const mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    count: {
        type: Number,
        default: 0,
    },
},
{
    timestamps: { createdAt: true, updatedAt: false },
})

module.exports = mongoose.model('Category', categorySchema)