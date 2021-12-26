const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    categoryId: String,
    eventTime: Date,
    description: String,
    address: String,
    numOfPeople: Number
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

EventSchema.virtual("category", {
    ref: "CategoryModel",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});
const EventModel = mongoose.model("EventModel", EventSchema, "events");
module.exports = EventModel;