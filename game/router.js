const router = require('express').Router();
const Game = require('../game/model');

// router for /api/game
router.post('/', function(req, res) {
    // search for wating game
    let user_id = req.body.decodedData.id;
    Game.findOneAndUpdate(
        {gameState: "WAITING", player: {$ne: user_id}}, // condition
        {opponent: user_id, state: "PLAYING", opponent: user_id}, // update
        {new: true}, 
        function(error, game) {
            if (error) {
                throw new Error(error)
            }
            if (game) {
                res.status(200).send({
                    status: "success",
                    message: "active game found and game started",
                    data: game,
                })
            }
            else {
                // create new game
                newGame = new Game();
                newGame.player = user_id;
                newGame.save().then(game => {
                    res.status(200).send({
                        status: "success",
                        message: "New game created",
                        data: {game}
                    })
                }).catch(err => {
                    res.status(500).send({
                        status: "fail",
                        message: err.message,
                        data: {err}
                    })
                })
                
            }
        })
})
module.exports = router