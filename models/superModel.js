


const mongoose = require("mongoose");

const SuperSchema = mongoose.Schema({
    email: String,
    recoveryWord: String,
    password: String,
    created_at: String,
    ID: Number,
    token: String,
});

const superModel = mongoose.model("super", SuperSchema);

module.exports = superModel;