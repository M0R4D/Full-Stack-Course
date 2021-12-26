const dal = require("../data-access-layer/dal");

const eventModel = require("../models/event-model");
const categoryModel = require("../models/category-model");


function getAllEventsAsync() {
    return eventModel.find().exec();
}


function getEventsPerCategoryAsync(_id) {
    return categoryModel.find({ _id: _id }).populate("events").exec();
}

function getAllCategoriesAsync() {
    return categoryModel.find().exec();
}

function addEventAsync(event) {
    return event.save();
}


function deleteEventAsync(_id) {
    return eventModel.findByIdAndDelete(_id).exec();
}

module.exports = {
    getAllEventsAsync,
    getEventsPerCategoryAsync,
    getAllCategoriesAsync,
    addEventAsync,
    deleteEventAsync
};