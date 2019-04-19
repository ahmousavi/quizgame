const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "نام کاربری وارد نشده است"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "رمز عبور وارد نشده است"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    token: {
        type: String,
        default: "",
    },
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
// userSchema.pre('findOneAndUpdate', function(next) {
//     let user = this
//     console.log("## in update", user);

    
//     console.log("## AFTER");
//     // hash the password using our new salt
//     bcrypt.hash(user.password, 10, function(err, hash) {
//         if (err) return next(err);
//         // override the cleartext password with the hashed one
//         user.password = hash;
//         next();
//     });
// })

userSchema.path('name').validate(async (value) => {
    const nameCount = await mongoose.models.User.countDocuments({name: value});
    return !nameCount;
}, 'نام کاربری تکراری است');

userSchema.path('password').validate(async (value) => {
    return value.length >= 6;
}, 'رمز عبور باید حداقل ۶ رقم باشد');

userSchema.methods.checkPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema)