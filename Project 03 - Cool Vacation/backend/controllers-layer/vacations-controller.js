const express = require("express");
const logic = require("../business-logic-layer/vacations-logic");
const imageHelper = require("../helpers/image-helper");
const errorsHelper = require("../helpers/errors-helper");
const VacationModel = require("../models/vacation-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");

const router = express.Router();

router.use(verifyLoggedIn);

// GET all vacations:
router.get("/", async (request, response) => {
    try {
        const vacations = await logic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch(err) {
        errorsHelper.internalServerError(response, err);
    }
});
// Admin and User

// GET one vacation:
router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacationAsync(id);
        if(!vacation) {
            response.status(404).send(`id ${id} not found`);
            return;
        }
        response.json(vacation);
    }
    catch (err) {
        errorsHelper.internalServerError(response, err);
    }
});
// Admin and User

// GET vacations per user:
router.get("/user-following-vacations/:userID", async (request, response) => {
    try {
        const userUuid = request.params.userUuid;
        const userID = +request.params.userID;
        const vacations = await logic.getVacationsPerUserAsync(userID);
        response.json(vacations);
    }
    catch(error) {
        errorsHelper.internalServerError(response, error);
    }
});
// User

// POST new vacation:
router.post("/", [verifyAdmin], async (request, response) => {
    try {
        // Model:
        const vacation = new VacationModel(request.body);

        // Validation: 
        const validateImage = imageHelper(request);
        if(validateImage.status === 400) {
            response.status(400).send(validateImage.message);
        }
        vacation.picFileName = validateImage.message;
        const errors = vacation.validatePost();
        if(errors) {
            console.log(errors)
            response.status(400).send(errors);
            return;
        }
        
        // Logic: 
        const addedVacation = await logic.addVacationAsync(vacation);

        // Success:
        response.status(201).json(addedVacation);
    }
    catch(err) {
        errorsHelper.internalServerError(response, err);
    }
});
// Admin only

// UPDATE existing vacation:
router.put("/:vacationId", [verifyAdmin], async (request, response) => {
    try {
        // Model:
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;
        const vacation = new VacationModel(request.body);
        console.log(vacation)
        
        // Validation:
        const errors = vacation.validatePut();
        console.log(errors)
        if(errors) {
            response.status(400).send(errors);
            return;
        }
        
        // Logic: 
        const updatedVacation = await logic.updateVacationAsync(vacation);
        console.log(updatedVacation)
        if(!updatedVacation) {
            response.status(404).send(`id ${id} not found`);
            return;
        }
        
        // Success: 
        console.log(updatedVacation)
        response.json(updatedVacation);
    }
    catch (error) {
        // response.status(500).send(error);
        errorsHelper.internalServerError(response, err);
    }
});
// Admin only

// DELETE existing vacation:
router.delete("/:vacationId", [verifyAdmin], async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        const affectedRows = await logic.deleteVacationAsync(vacationId);
        (affectedRows) ? response.sendStatus(204) : response.sendStatus(400)
        // response.sendStatus(204);
    }
    catch(err) {
        errorsHelper.internalServerError(response, err);
    }
});
// Admin only


module.exports = router;