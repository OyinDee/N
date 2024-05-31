const mongoose = require("mongoose");

const ResultsSchema = mongoose.Schema({
    studentID: Number,
    quizID: Number,
    result: Number,
});

const resultsModel = mongoose.model("results", ResultsSchema);

module.exports = resultsModel;
