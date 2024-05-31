const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
const { createHash } = require("crypto");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const sha256 = require("sha256");
const JWT_SECRET = process.env.JWT_SECRET;
const quizModel = require('../models/quizModel')
const JWT_KEY = process.env.JWT_KEY;
const materialModel = require("../models/materialModel");
const notificationModel = require("../models/notificationModel");
const createQuiz = async(request, response) => {
  const newQuiz = {
    questionSet: request.body.questions,
    courseID: request.body.courseID,
    date_created: new Date(),
    deadline: request.body.date,
    time_allocated: request.body.time,
    quizID: Math.floor(Math.random() * 9000) + 1000,
  };

  const wait = await quizModel.create(newQuiz)
  response.send('Quiz created successfully!')
};
const sendNotif = async (request, response) => {
  const newNotif = {
    courseID: request.body.courseID,
    title: request.body.title,
    date_created: new Date(),
    info: request.body.info,
  };
  const done = await notificationModel.create(newNotif);
  if (done) {
    response.send("done");
  } else {
    response.send("{not done");
  }
};

const login = async (request, response) => {
  console.log(request.body);
  const email = request.body.email;
  const Rpassword = request.body.password;
  const emailExists = await adminModel.find({ email: email });

  if (emailExists.length !== 0) {
    console.log("FOUND");
    const email = emailExists[0].email;
    const password = emailExists[0].password;

    const match = await bcryptjs.compare(Rpassword, password);

    if (match) {
      console.log("yes");
      response.send("Logged in");
    } else {
      console.log("no");
      response.send("Wrong password");
    }
  } else {
    response.send({ message: "Not an admin", status: 404, text: "NO" });
  }
};

const validate_token = async (request, response) => {
  const auth = request.headers.authorization;
  const token = auth.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`jwt could not be decoded`);
      response.send({ message: err.message });
    } else {
      const emailExists = adminModel.find({ email: decoded.email });

      if (emailExists[0].admin == true) {
        response.send({
          message: "verification successful",
          email: decoded.email,
          ID: decoded.ID,
        });
      } else {
        response.send("no");
      }
    }
  });
};

const deleteMaterial = async (request, response) => {
  console.log(request.body);
  const ID = request.body.ID;
  const found = materialModel.find({ materialID: ID });
  if (found.length == 0) {
    console.log("Not found");
    response.send("Not found");
  } else {
    await materialModel.deleteOne({ materialID: ID });
    response.send("Done");
  }
};

module.exports = { validate_token, login, deleteMaterial, sendNotif, createQuiz };
