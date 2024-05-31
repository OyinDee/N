const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    level: Number,
    token: String,
    tokenNumber: Number,
    matricNumber: String,
    department: String,
    coursesID: Array,
    ID: Number,
    password: String,
    email: String,
    phoneNumber: Number,
    profile_image: String,
    courses: Array,
    verified: {
        type: Boolean,
        default: false
    },
    created_at: String,
    admin: {
        type: Boolean,
        default: false
    },
});

const studentModel = mongoose.model("students", StudentSchema);

module.exports = studentModel;