var express = require('express');
var router = express.Router();
const AuthController = require('../Controllers/authController');
const languageController = require('../Controllers/languageController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/changeLang/:lang', languageController.changeLang);


module.exports = router;
