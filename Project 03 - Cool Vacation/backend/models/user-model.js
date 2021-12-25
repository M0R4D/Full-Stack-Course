const Joi = require("joi");

class UserModel {

    constructor(user) {
        this.userID = user.userID;
        this.uuid = user.uuid;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.isAdmin = false;
    }

    validatePost() {
        const validationSchema = Joi.object({
            userID: Joi.forbidden(),
            uuid: Joi.forbidden(),
            firstName: Joi.string().required().min(3).max(25),
            lastName: Joi.string().required().min(3).max(25),
            username: Joi.string().required().min(3).max(25),
            password: Joi.string().required().max(600),
            isAdmin: Joi.boolean()
        });
        const result = validationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all errors and not only the first one
        return result.error?.details.map(err => err.message); // If there is an error - return it as an array, otherwise return null
    }
}


module.exports = UserModel;