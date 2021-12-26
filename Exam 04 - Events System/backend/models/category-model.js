const mongoose = require("mongoose");


const CategorySchema = mongoose.Schema({
    name: String
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


CategorySchema.virtual("events", {
    ref: "EventModel",
    localField: "_id",
    foreignField: "categoryId",
});

const CategoryModel = mongoose.model("CategorySchema", CategorySchema, "categories");

module.exports = CategoryModel;

