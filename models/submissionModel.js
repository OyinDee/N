const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema({
    document: String,
    assignmentID: Number,
    title: String,
    body: String,
    studentID: Number,
});

const submissionModel = mongoose.model("submissions", SubmissionSchema);

module.exports = submissionModel;