const router = require('express').Router();
const Game = require('../models/game');

// router for /api/game
router.post('/', function(req, res) {
    // search for wating game
    let { user_id } = req.body;
    Game.findOneAndUpdate({state: "WAITING", player: {$ne: user_id}}, {opponent: user_id}, {new: true}, function(error, game) {
        if (error) {
            throw new Error(error)
        }
        if (game) {
            res.status(200).send({
                status: "success",
                message: "active game found",
                data: game,
            })
        }
        else {
            // create new game
            res.status(404).send({
                status: "fail",
                message: "No active game found, must create new",
                data: {game}
            })
        }
    })
})
module.exports = router