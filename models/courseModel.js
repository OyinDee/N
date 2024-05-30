const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    // everything to be added by ID and not actual names like materialsID, StudentID and all..
    courseCode: String,
    students: Array,
    lecturers: Array,
    materials: Array,
    courseID: Number,
    department: String,
    level: Number,
});

const courseModel = mongoose.model("courses", CourseSchema);

module.exports = courseModel;