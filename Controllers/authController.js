const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const authUtil = require('../utils/authUtils');


exports.login = (req,res,next) => {
   const phNumber = req.body.phNumber;
   const password = req.body.password;
   PlayerRepository.findByPhoneNumber(phNumber)
       .then(player => {
           if(!player || player.password === undefined){
               res.render('index', {
                   navLocation: '',
                   loginError: "Invalid phone number or password. User may not exist. / Niepoprawny Nr Telefonu lub hasło. "

               })
               console.log("Player error. Authentication.")
           } else if(authUtil.comparePasswords(password, player.password) === true) {
               req.session.loggedUser = player;
               console.log("Logged as: " + req.session.loggedUser.toString());
               res.redirect('/');
           } else {
               res.render('index', {
                   navLocation: '',
                   loginError: "Invalid phone number or password. / Niepoprawny Nr Telefonu lub hasło."
               })
           }
       })
       .catch(err => {
           console.log(err);
       });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

