const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
    courseID: String,
    date_created: Date,
    info: String,
    title: String,
});

const notificationModel = mongoose.model("materials", NotificationSchema);

module.exports = notificationModel;