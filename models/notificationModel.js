const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
    courseID: Number,
    date_created: Date,
    info: String,
    title: String,
    private: {
        default: false,
        type: Boolean
    },
    studentID: Number,
});

const notificationModel = mongoose.model("notifications", NotificationSchema);

module.exports = notificationModel;