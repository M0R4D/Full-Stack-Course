const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const UserModel = require("../models/user-model");
const router = express.Router();

router.post("/register", async (request, response) => {
    try {
        // Model:
        const user = new UserModel(request.body);

        // Validate:
        const errors = user.validatePost();
        if (errors) {
            console.error(errors);
            response.status(400).send(errors);
            // errorsHelper.internalServerError(response, errors);
        }

        // Logic:
        const addedUser = await authLogic.registerAsync(request.body);
        
        // Success:
        response.status(201).json(addedUser);
    }
    catch (errors) {
        errorsHelper.internalServerError(response, errors);
    }
});

router.post("/login", async (request, response) => {
    try {
        console.log(request.body)
        const loggedInUser = await authLogic.loginAsync(request.body);
        console.log(loggedInUser)
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        response.json(loggedInUser);
    }
    catch (err) {
        errorsHelper.internalServerError(response, err);
    }
});

// const verifyLoggedIn = require("../middleware/verify-logged-in");
// router.get("/refresh-token", verifyLoggedIn, async (request, response) => {
//     // response.headers.newToken = ...
// });

module.exports = router;