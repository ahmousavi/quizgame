const router = require('express').Router();
const Game = require('../game/model');
const controllers = require('./controllers');

// router for /api/game
router.post('/', controllers.startGame);
router.get('/', function(req, res) {
    Game.find()
    .populate('player').then(games => {
        res.status(200).json({
            status: "success",
            message: "thease are all games",
            data: games,
        })
    })
})
// router.get('/:id', controllers.getGame);
// router.put('/:id', controllers.updateGame);

router.get('/:name', controllers.getUserGames);


module.exports = router;