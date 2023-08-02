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
            case "date.min":
                err.message = `Date To cannot be earlier than Date From.`;
                break;
            case "date.max":
                err.message = `Date From cannot be from the future.`;
                break;
            default:
                break;
        }
    });
    return errors;
}



const contractSchema = Joi.object({
    conId: Joi.number()
        .optional()
        .allow(""),

    pId: Joi.number()
        .required(),

    orgId: Joi.number()
        .required(),

    dateFrom: Joi.date()
        .max("now")
        .required()
        .error(errMessages),

    dateTo: Joi.date()
        .min(Joi.ref('dateFrom'))
        .required()
        .error(errMessages),


    salary: Joi.number()
        .min(20000)
        .required()
        .error(errMessages),

});



module.exports = contractSchema;