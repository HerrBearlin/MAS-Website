const PlayerRepository = require('../repository/mysql2/PlayerRepository');


exports.getPlayers = (req, res, next) => {
    PlayerRepository.getPlayers()
        .then(players => {
            res.status(200).json(players);
        }).catch(err => {
            console.log(err);
    });

};

exports.getPlayerById = (req, res, next) => {
    const pId = req.params.pId;
    PlayerRepository.getPlayerById(pId)
        .then(player => {
            if(!player)
            {
                res.status(404).json({
                    message: 'Player with id: ' +pId+ ' not found'
                })
            }else
            {
                res.status(200).json(player);
            }
        });
};


exports.createPlayer = (req, res, next) => {
    PlayerRepository.createPlayer(req.body)
        .then(newObj => {
            res.status(201).json(newObj)
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updatePlayer = (req, res, next) => {
    const pId = req.params.pId;
    PlayerRepository.updatePlayer(pId, req.body)
        .then(result => {
            res.status(200).json({message: 'Employee updated!', p: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.deletePlayer = (req, res, next) => {
    const pId = req.params.pId;
    PlayerRepository.deletePlayer(pId)
        .then(result => {
            res.status(200).json({message: 'Removed player', p: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });

};










