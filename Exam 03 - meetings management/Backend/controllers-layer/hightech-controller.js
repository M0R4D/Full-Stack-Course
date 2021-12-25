const express = require("express");
const logic = require("../business-logic-layer/hightech-logic");
const router = express.Router();

// GET all groups:
router.get("/api/groups", async (request, response) => {
    try {
        const groups = await logic.getAllGroupsAsync();
        response.json(groups);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// GET meetings per group:
router.get("/api/meetings-per-group/:groupId", async (request, response) => {
    try {
        const groupId = +request.params.groupId;
        const meetings = await logic.getMeetingsPerGroupAsync(groupId);
        response.json(meetings);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// POST new meeting:
router.post("/api/meetings", async (request, response) => {
    try {
        const meeting = request.body;
        const addedMeeting = await logic.addMeetingAsync(meeting);
        response.status(201).json(addedMeeting);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;