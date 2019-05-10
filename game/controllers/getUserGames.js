const Game = require('./../model');
const User = require('./../../user/model')
module.exports = function (req, res) {
    let user_name = req.params.name;
    User.findOne({name: user_name}, (err, user) => {
        if (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
                errors: err
            })
        }
        else if (!user) {
            res.status(404).json({
                status: "fail",
                message: "کاربری با این نام وجود ندارد",
            })    
        }
        else if (!user._id.equals(req.decodedData.id) && !req.decodedData.admin) {
            res.status(403).json({
                status: "fail",
                message: "دسترسی به اطلاعات کاربر مجاز نیست",
            })    
        }
        else {
            Game.find({player: user._id}, {_id:0, __v:0})
            .then(games => {
                res.status(200).json({
                    status: "success",
                    message: "همه بازی های کاربر",
                    data: games,
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: "fail",
                    message: err.message,
                    errors: err
                })
            })
        }
    })
}