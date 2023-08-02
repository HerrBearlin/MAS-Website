const bcrypt = require('bcryptjs');
const {log} = require("debug");
const {getContractById} = require("../repository/mysql2/ContractRepository");

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser){
        next();
    } else {
        throw new Error('Unauthorised access. Please log in.');
    }
}

exports.permitCaptainOrThisPlayer = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const pId = req.params.pId;
    if(loggedUser)
    {
        console.log(loggedUser.isCaptain);
        if (loggedUser.isCaptain == 1) {
            next();
        } else if (loggedUser.pId == pId) {
            next();
        }else {
            throw new Error('Unauthorised access, insufficient rights.')
        }
    } else {
        throw new Error('Unauthorised access, insufficient rights.')
    }
}

exports.permitCaptain = (req, res, next) => {
    const loggedUser = req.session.loggedUser;

    if(loggedUser) {
        if (loggedUser.isCaptain.toString() === "1") {
            next();
        }else {
            throw new Error('Unauthorised access, insufficient rights.')
        }
    } else {
        throw new Error('Unauthorised access, insufficient rights.')
    }
}

exports.permitPlayerOrCaptainToEdit = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const pId = req.body.pId;
    if(loggedUser) {
        if (loggedUser.isCaptain.toString() === "1") {
            next();
        }else if (loggedUser.pId == pId){
            next();
        }
    } else {
        throw new Error('Unauthorised access, insufficient rights.')
    }
}