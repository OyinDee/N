const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    courses: Object,
    token: String,
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
    admin: {
        type: Boolean,
        default: true
    },
});

const adminModel = mongoose.model("admin", AdminSchema);

module.exports = adminModel;