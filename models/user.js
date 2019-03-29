const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var userSchema = new mongoose.Schema({
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
    // token: {
    //     type: String,
    //     default: "",
    // },
    admin: {
        type: Boolean,
        default: false,
    },
    level: {
        type: Number,
        default: 1,
    },
    coins: {
        type: Number,
        default: 0,
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
})
userSchema.pre('save', function(next) {
    let user = this

    if (!user.isModified('password')) return next()

    // hash the password using our new salt
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
})
userSchema.methods.checkPassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema)