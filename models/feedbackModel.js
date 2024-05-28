const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
    feedback: String,
    date: Date,
});

const feedbackModel = mongoose.model("feedbacks", FeedbackSchema);

module.exports = feedbackModel;