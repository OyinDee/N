const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema({
    document: String,
    assignmentID: Number,
    title: String,
    body: String,
    studentID: Number,
});

const assignmentModel = mongoose.model("assignments", AssignmentSchema);

module.exports = assignmentModel;