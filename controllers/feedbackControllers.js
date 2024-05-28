const jwt = require('jsonwebtoken');
const feedbackModel = require("../models/feedbackModel");
const { createHash } = require('crypto');
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");
const sha256 = require('sha256')
const JWT_SECRET = process.env.JWT_SECRET
const JWT_KEY = process.env.JWT_KEY

const feedback = async (request,response) =>{
    const feedback = {feedback: request.body.feedback, date: Date()}
    await feedbackModel.create(feedback).then((result)=>{
        console.log(result)
        response.send("submitted")
      });
}
  
  module.exports = { feedback };