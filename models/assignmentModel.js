

const mongoose = require("mongoose");

const AssignmentSchema = mongoose.Schema({
    images: Array,
    studentID: Number,
    courseID: Number,
    title: String,
    body: String,
});

const assignmentModel = mongoose.model("assignments", AssignmentSchema);

module.exports = assignmentModel;