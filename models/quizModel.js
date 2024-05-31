const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
  questionSet: Object,
  courseID: Number,
  quizID: Number,
  date_created: Date,
    deadline: Date,
    //time in mins
  time_allocated: Number,
});

const quizModel = mongoose.model("quiz", QuizSchema);

module.exports = quizModel;
