const express = require('express');
const router = express.Router();

const playerController = require('../Controllers/playerController.js');
const authUtils = require('../utils/authUtils');


router.get('/', playerController.showPlayerList);
router.get('/add', authUtils.permitAuthenticatedUser, playerController.showAddPlayerForm);
router.get('/edit/:pId', authUtils.permitCaptainOrThisPlayer, playerController.showEditPlayerForm);
router.get('/details/:pId', authUtils.permitCaptainOrThisPlayer, playerController.showPlayerDetails);


router.post('/add', authUtils.permitAuthenticatedUser, playerController.addPlayer);
router.post('/edit', authUtils.permitPlayerOrCaptainToEdit, playerController.updatePlayer);
router.get('/delete/:pId', authUtils.permitCaptain, playerController.deletePlayer);

module.exports = router;