const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  studentID: String,
  materialID: Object,
  paymentDetails: Object,
  status: Boolean,
  reference : String,
});

const historyModel = mongoose.model("paymenthistory", historySchema);

module.exports = historyModel;