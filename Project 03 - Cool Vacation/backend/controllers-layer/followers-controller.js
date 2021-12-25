const express = require("express");
const logic = require("../business-logic-layer/followers-logic");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();


// POST followed vacations
router.post("/:userID/:vacationId", async (request, response) => {
    try {
        const userID = request.params.userID;
        const vacationId = +request.params.vacationId;
        const followedVacation = await logic.followNewVacationAsync(userID, vacationId);
        response.status(201).json(followedVacation)
    } 
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// DELETE existing vacation:
router.delete("/:userID/:vacationId", async (request, response) => {
    try {
        const userID = request.params.userID;
        const vacationId = +request.params.vacationId;
        await logic.unfollowVacationAsync(userID, vacationId);
        response.sendStatus(204);
    }
    catch(error) {
        errorsHelper.internalServerError(response, error);
    }
});
// Admin only


module.exports = router;