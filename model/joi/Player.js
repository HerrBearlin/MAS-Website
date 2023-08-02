const Joi = require('joi');

const myCustomJoi = Joi.extend(require('joi-phone-number'));

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code){
            case "string.empty" :
                err.message = "Field is required";
                break;
            case "string.min":
                err.message = `The field should contain at least ${err.local.limit} characters`;
                break;
            case "string.max":
                err.message = `The field should contain at most ${err.local.limit} characters`;
                break;
            case "string.phoneNumber":
                err.message = "Field should contain a suitable phone number" ;
                break;
            case "date.max":
                err.message = `Date cannot be from the future.`;
                break;
            default:
                break;
        }
    });
    return errors;
}



const playerSchema = Joi.object({
    pId: Joi.number()
        .optional()
        .allow(""),

    fName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),

    lName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),

    dateOfBirth: Joi.date()
        .max("now")
        .required()
        .error(errMessages),

    nName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),

    isCaptain: Joi.number()
        .min(0)
        .max(1)
        .required()
        .error(errMessages),

    pPlayed: Joi.string()
        .optional()
        .allow("")
        .error(errMessages),

    phNumber: myCustomJoi.string()
        .phoneNumber()
        .required()
        .error(errMessages),

    password: Joi.string()
        .required()
        .min(1)
        .max(15)
        .error(errMessages)

});



module.exports = playerSchema;


