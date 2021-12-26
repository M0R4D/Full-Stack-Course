const express = require('express');
const logic = require('../business-logic/events-logic');
const EventModel = require('../models/event-model');
const router = express.Router();


// GET All Events 
router.get("/events", async (request, response) => {
    try {
        const events = await logic.getAllEventsAsync();
        response.json(events);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


// GET Events per Category
router.get("/events-per-category/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const events = await logic.getEventsPerCategoryAsync(_id);
        response.json(events);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.get("/categories", async (request, response) => {
    try {
        const categories = await logic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
})
// Post new Event
router.post("/events", async (request, response) => {
    try {
        const event = new EventModel(request.body);

        const addedEvent = await logic.addEventAsync(event);
        response.status(201).json(addedEvent);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


// DELETE Event
router.delete("/events/:eventId", async (request, response) => {
    try {
        const eventId = request.params.eventId;
        await logic.deleteEventAsync(eventId);
        response.sendStatus(204);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = router;