const express = require('express');
const router = express.Router();

const organisationController = require('../Controllers/organisationController.js');
const authUtils = require("../utils/authUtils");




router.get('/', organisationController.showOrganisationList);
router.get('/add', authUtils.permitCaptain, organisationController.showAddOrganisationForm);
router.get('/edit/:orgId', authUtils.permitCaptain, organisationController.showEditOrganisationForm);
router.get('/details/:orgId', authUtils.permitCaptain, organisationController.showOrganisationDetails);

router.post('/add', authUtils.permitCaptain,organisationController.addOrganisation);
router.post('/edit', authUtils.permitCaptain, organisationController.updateOrganisation);
router.get('/delete/:orgId',authUtils.permitCaptain, organisationController.deleteOrganisation);

module.exports = router;