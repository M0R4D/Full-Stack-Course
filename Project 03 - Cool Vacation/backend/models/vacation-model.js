const Joi = require("joi");

class VacationModel {

    constructor(vacation) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.price = vacation.price;
        this.start = vacation.start;
        this.end = vacation.end;
        this.picFileName = vacation.picFileName;
    }

    validatePost() {
        const validationSchema = Joi.object({
            vacationId: Joi.forbidden(),
            description: Joi.string().required().min(5).max(1000),
            destination: Joi.string().required().min(3).max(25),
            price: Joi.number().required().min(0).max(10000),
            start: Joi.string().required(),
            end: Joi.string().required(),
            picFileName: Joi.string().required().max(50)
        });
        const result = validationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all errors and not only the first one
        return result.error?.details.map(err => err.message); // If there is an error - return it as an array, otherwise return null
    }


    validatePut() {
        const validationSchema = Joi.object({
            vacationId: Joi.required(),
            description: Joi.string().required().min(5).max(1000),
            destination: Joi.string().required().min(3).max(50),
            price: Joi.number().required().min(0).max(10000),
            start: Joi.string().required(),
            end: Joi.string().required(),
            picFileName: Joi.forbidden()
            // picFileName: Joi.string().required().max(40)
        });
        const result = validationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all errors and not only the first one
        // return result.error?.message; // If there is an error - return it as a string, otherwise return null
        return result.error?.details.map(err => err.message);// If there is an error - return it as an array, otherwise return null
    }

}


module.exports = VacationModel;