const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    courses: Object,
    level: Number,
    department: String,
    ID: Number,
    password: String,
    email: String,
    phoneNumber: Number,
    profile_image: String,
    verified: {
        type: Boolean,
        default: false
    },
    created_at: String,
});

const studentModel = mongoose.model("students", StudentSchema);

module.exports = studentModel;