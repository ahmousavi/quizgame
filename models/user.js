const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
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
userSchema.path('name').validate(async (value) => {
    const nameCount = await mongoose.models.User.countDocuments({name: value });
    return !nameCount;
}, 'Name already exists');
userSchema.path('password').validate(async (value) => {
    return value.length >= 8;
}, 'Password is short');
// userSchema.post('save', function(error, user, next) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//         next(new Error('There was a duplicate key error'));
//     } else {
//         next(error);
//     }
// })

userSchema.methods.checkPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema)