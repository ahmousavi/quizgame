const Game = require('./../model');

module.exports = function(req, res) {
    // search for wating game
    let user_id = req.decodedData.id;
    Game.findOneAndUpdate(
        {gameState: "WAITING", player: {$ne: user_id}}, // condition
        {opponent: user_id, state: "PLAYING", opponent: user_id}, // update
        {new: true}, 
        function(error, game) {
            if (error) {
                res.status(500).send({
                    status: "fail",
                    message: err.message,
                    data: {err}
                })
            }
            else if (game) {
                res.status(200).send({
                    status: "success",
                    message: "حریف پیدا شد و بازی شروع شد",
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
                        message: "بازی جدید ایجاد شد ، در انتظار حریف...",
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
}