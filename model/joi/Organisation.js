const Joi = require('joi');

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
            default:
                break;
        }
    });
    return errors;
}



const organisationSchema = Joi.object({
    orgId: Joi.number()
        .optional()
        .allow(""),

    orgName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),

    leagueName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),


    budget: Joi.number()
        .min(20000)
        .max(10000000)
        .required()
        .error(errMessages),



});



module.exports = organisationSchema;
