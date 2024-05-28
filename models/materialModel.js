const mongoose = require("mongoose");

const MaterialSchema = mongoose.Schema({
    courseCode: String,
    materialID: Number,
    materialURL: String,
    coverImage: String,
    date_created: Date,
    author: String,
    price: String,
});

const materialModel = mongoose.model("materials", MaterialSchema);

module.exports = materialModel;