const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentModel");
const { createHash } = require("crypto");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const sha256 = require("sha256");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_KEY = process.env.JWT_KEY;
const quizModel = require("../models/quizModel");
const notificationModel = require("../models/notificationModel");
const { forEach } = require("async");
// // for emAIL VERIFICATION

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "iceysh.ts@gmail.com",
    pass: "uhrhgtufrqxeuhjr",
  },
});

const register = async (request, response) => {
  console.log(request.body);

  const email = request.body.email;
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const courses = request.body.courses;
  const level = request.body.level;
  const department = request.body.department;
  const date = new Date();
  const plainPassword = request.body.password;
  const salt = bcryptjs.genSaltSync(10);
  const hashedPass = bcryptjs.hashSync(plainPassword, salt);
  const ID = Math.floor(Math.random() * 9000000) + 1000000;
  const phoneNumber = request.body.phoneNumber;
  let data = {
    ID: ID,
    email: email,
  };
  const token = jwt.sign(data, JWT_SECRET);
  const tokenNumber = Math.floor(Math.random() * 9000) + 1000;
  const newUser = {
    email: email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: hashedPass,
    courses: request.body.courses,
    level: request.body.level,
    department: request.body.department,
    phoneNumber: request.body.phoneNumber,
    created_at: date,
    ID: ID,
    token: token,
    tokenNumber: tokenNumber,
  };

  const emailExists = await studentModel.find({ email: newUser.email });

  if (emailExists.length > 0) {
    console.log("Email exists");
    response.send({ message: `Email already exists.`, text: "no" });
  } else {
    const mailOptions = {
      from: "iceysh.ts@gmail.com",
      to: email,
      subject: "Confirm your email address",
      text: `Hey, Jiggy! \nEnter this code to verify your email address: ${tokenNumber}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        response.status(500).send("Error sending verification email.");
      } else {
        console.log("Email sent: " + info.response + tokenNumber);
        response.send({
          message: "Success! Verification email sent.",
          info: token,
        });
      }
    });

    await studentModel.create(newUser).then((result) => {
      console.log(result);
    });
  }
};
const fetchNotif = async (request, response) => {
  const courses = request.body.IDs;
  console.log(courses);
  const sCourses = [];

  for (e of courses) {
    console.log(e);
    const found = await notificationModel.find({ courseID: e, private: false });
    // console.log(found);
    if (found.length !== 0) {
      sCourses.push(found);
    }
  }
  console.log(sCourses);
  const studentID = request.body.studentID;
  const foundd = await notificationModel.find({ studentID: studentID });
  sCourses.push(foundd);
};
const login = async (request, response) => {
  console.log(request.body);
  const email = request.body.email;
  const Rpassword = request.body.password;
  const emailExists = await studentModel.find({ email: email });

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
    response.send({
      message: "What you need to do is create an account..",
      status: 404,
      text: "NO",
    });
  }
};

const validate_token = (request, response) => {
  const auth = request.headers.authorization;
  const token = auth.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`jwt could not be decoded`);
      response.send({ message: err.message });
    } else {
      console.log(decoded);
      response.send({
        message: "verification successful",
        email: decoded.email,
        ID: decoded.ID,
      });
    }
  });
};

const verify = async (request, response) => {
  const update = await studentModel.findOneAndUpdate(
    { tokenNumber: request.body.tokenNumber },
    { verified: true },
    { new: true }
  );
  if (update) {
    console.log(update);

    response.send("Yes");
  } else {
    console.log(update);

    response.send("No");
  }
};

module.exports = { login, register, validate_token, verify, fetchNotif };
