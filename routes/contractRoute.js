const express = require('express');
const router = express.Router();

const contractController = require('../Controllers/contractController');
const authUtils = require("../utils/authUtils");


router.get('/', authUtils.permitAuthenticatedUser, contractController.showContractList);
router.get('/add', authUtils.permitCaptain, contractController.showAddContractForm);
router.get('/edit/:conId', authUtils.permitCaptain, contractController.showEditContractForm);
router.get('/details/:conId', authUtils.permitCaptain, contractController.showContractDetails);

router.post('/add', authUtils.permitCaptain, contractController.addContract);
router.post('/edit', authUtils.permitCaptain, contractController.updateContract);
router.get('/delete/:conId', authUtils.permitCaptain, contractController.deleteContract);

module.exports = router;