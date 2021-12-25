const express = require("express");
const logic = require("../business-logic-layer/users-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// GET all users:
router.get("/", async (request, response) => {
    try {
        const users = await logic.getAllUsersAsync();
        response.json(users);
    }
    catch(err) {
        errorsHelper.internalServerError(response, err);
    }
});
// No One...

module.exports = router;