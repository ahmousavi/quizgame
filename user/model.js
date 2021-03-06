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
        minlength: [6, 'رمز عبور باید حداقل ۶ رقم باشد']    
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        sparse: true
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
    removed: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: { createdAt: true, updatedAt: false },
})
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = bcrypt.hashSync(this.password, 10);            
        }
        catch (err) {
            next(err);
        }
    }
    if (this.isModified('name')) {
        const nameCount = await mongoose.models.User.countDocuments({name: this.name})
        if (nameCount) {
            next({
                name: 'ValidatorError',
                message:'نام کاربری تکراری است'
            })
        }
    }
    next()
})

userSchema.methods.checkPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema)