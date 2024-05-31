const mongoose = require("mongoose");

const MaterialSchema = mongoose.Schema({
    courseID: String,
    materialID: Number,
    materialURLs: Array,
    coverImage: String,
    date_created: Date,
    author: String,
    price: String,
});

const materialModel = mongoose.model("materials", MaterialSchema);

module.exports = materialModel;