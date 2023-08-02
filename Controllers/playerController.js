const PlayerRepository  = require('../repository/mysql2/PlayerRepository');


exports.showPlayerList = (req, res, next) => {
    PlayerRepository.getPlayers()
        .then(players => {
            res.render('pages/player/list', {
                players: players,
                navLocation: 'player',
                validationErrors: []
            });
        });
}


exports.showAddPlayerForm = (req, res, next) => {
    res.render('pages/player/form', {
        player: {},
        pageTitle: req.__('player.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('player.form.add.btnLabel'),
        formAction: '/players/add',
        navLocation: 'player',
        validationErrors: []
    });
};

exports.showEditPlayerForm = (req, res, next) => {
    const pId = req.params.pId;
    PlayerRepository.getPlayerById(pId)
        .then(player => {
            res.render('pages/player/form', {
                player: player,
                formMode: 'edit',
                pageTitle: req.__('player.form.edit.pageTitle'),
                btnLabel: req.__('player.form.edit.btnLabel'),
                formAction: '/players/edit',
                navLocation: 'player',
                validationErrors: []
            });
        });

};


exports.showPlayerDetails = (req, res, next) => {
    const pId = req.params.pId;
    PlayerRepository.getPlayerById(pId)
        .then(player => {
            res.render('pages/player/form', {
                player: player,
                formMode: 'showDetails',
                pageTitle: req.__('player.form.details.pageTitle'),
                formAction: '',
                navLocation: 'player',
                validationErrors: []
            });
        });
};

//The operation const empData = { ...req.body }; creates a new Javascript object empData copying all fields from req.body.
exports.addPlayer = (req, res, next) => {
    const pData = {...req.body};
    console.log(pData);
    PlayerRepository.createPlayer(pData)
        .then(result => {
            res.redirect('/players');
        }).catch(err => {
            console.log(pData);
            console.log(err);
            res.render('pages/player/form', {
                player: pData,
                pageTitle: req.__('player.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('player.form.add.btnLabel'),
                formAction: '/players/add',
                navLocation: 'player',
                validationErrors: err.details
            });
        });

};

exports.updatePlayer = (req, res, next) => {
    const pId = req.body.pId;
    const pData = {...req.body};
    PlayerRepository.updatePlayer(pId, pData)
        .then(result => {
            res.redirect('/players');
        }).catch(err => {
        console.log(pData.contracts);
        console.log(err.message);
        res.render('pages/player/form', {
            player: pData,
            formMode: 'edit',
            pageTitle: req.__('player.form.edit.pageTitle'),
            btnLabel: req.__('player.form.edit.btnLabel'),
            formAction: '/players/edit',
            navLocation: 'player',
            validationErrors: err.details
        });
    });
};

exports.deletePlayer = (req, res, next) => {
    const pId = req.params.pId;
    PlayerRepository.deletePlayer(pId)
        .then( () => {
            return PlayerRepository.getPlayers();
        })
        .then(allPlayers => {
            res.render('pages/player/list', {
                players: allPlayers,
                navLocation: 'player',
                validationErrors: []
            });
        });
};

//req = object reprsenting client's request
//res = http response
//next = optional parameter to refer to the next object in processing chain






