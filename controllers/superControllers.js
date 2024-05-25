const jwt = require('jsonwebtoken');
const superModel = require("../models/superModel");
const adminModel = require("../models/adminModel")
const studentModel = require("../models/studentModel")
const courseModel = require("../models/courseModel")

const { createHash } = require('crypto');
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");
const sha256 = require('sha256')
const JWT_SECRET = process.env.JWT_SECRET
const JWT_KEY = process.env.JWT_KEY

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'iceysh.ts@gmail.com',
        pass: 'uhrhgtufrqxeuhjr',
    },
});


const addAdmin = async (request, response) => {
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
      ID: ID, email:email
    }
    const token = jwt.sign(data, JWT_SECRET)
    const newAdmin = {
      email: email,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: hashedPass,
      courses: request.body.courses,
      phoneNumber: request.body.phoneNumber,
      created_at: date,
      ID: ID,
      token: token,
    };

    const emailExists = await adminModel.find({ email: newAdmin.email });

    if (emailExists.length > 0) {
      console.log("Email exists");
      response.send({ message: `Email already exists.`, text: 'no' });
    }  else {
        await adminModel.create(newAdmin).then((result)=>{
          console.log(result)
        });
      response.send({  text: 'Admin created' });                                                                     
    }
  
}

const addSuper = async(request, response) =>{
    const date = new Date();
    const email = request.body.email
    const plainPassword = request.body.password;
    const salt = bcryptjs.genSaltSync(10);
        const hashedEmail = createHash('sha256').update(email).digest('hex');
    const hashedPass = bcryptjs.hashSync(plainPassword, salt);
    const ID = Math.floor(Math.random() * 9000000) + 1000000;
    let data = {
        ID: ID, email:email
      }
      const token = jwt.sign(data, JWT_SECRET)
      const newAdmin = {
        email: hashedEmail,
        recoveryWord: request.body.recoveryWord,
        password: hashedPass,
        created_at: date,
        ID: ID,
        token: token,
      };
      const emailExists = await superModel.find({ email: hashedEmail });

      if (emailExists.length > 0) {
        console.log("Email exists");
        response.send({ message: `Email already exists.`, text: 'no' });
      }  else {
        await superModel.create(newAdmin).then((result)=>{
            console.log(result)
            response.send("Done")
          });
      }
}

const addStudent = async(request, response) => {
   
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
      ID: ID, email:email
    }
    const token = jwt.sign(data, JWT_SECRET)
    const tokenNumber =  Math.floor(Math.random() * 9000) + 1000;
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
      response.send({ message: `Email already exists.`, text: 'no' });
    }  else {    
      const mailOptions = {
        from: 'iceysh.ts@gmail.com',
        to: email,
        subject: 'Confirm your email address',
        text: `Hey, Jiggy! \nEnter this code to verify your email address: ${tokenNumber}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          response.status(500).send('Error sending verification email.');
        } else {
          console.log('Email sent: ' + info.response + tokenNumber );
          response.send('Success! Verification email sent.');
        }
      });

      await studentModel.create(newUser).then((result)=>{
        console.log(result)
      });
        }
      
    
}

const validate_token = (request, response) => {
    const auth = request.headers.authorization
    const token = auth.split(' ')[1]
    console.log(token)
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            console.log(`jwt could not be decoded`)
            response.send({message:err.message})
        }  
        else{
            console.log(decoded)
            response.send({message:'verification successful', email:decoded.email, ID: decoded.ID})
        }
    })
  }

const login = async(request, response)=>{
    try {
        console.log(request.body);
        const email = request.body.email;
        const hashedEmail = createHash('sha256').update(email).digest('hex');
    
        const result = await superModel.find({ email: hashedEmail });
    
        if (result.length === 0) {
          console.log("Nothing");
          return response.status(404).json({ message: "Not a super admin"});
        }

        const passw = result[0].password;
        const myPlaintextPassword = request.body.password;
    
        const match = await bcryptjs.compare(myPlaintextPassword, passw);
    
        if (match) {
          const token = jwt.sign({ email: hashedEmail }, process.env.JWT_SECRET, {});
    
          response.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }); // Set the token in an HTTP-only cookie
          response.json({ message: "Your login is successful!", token});
        } else {
          response.status(401).json({ message: "Incorrect password", result });
        }
      } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
}

const setupCourse = async(request, response) =>{
    console.log(request)
    const newCourse = {
      courseCode: request.body.courseCode,
      students: request.body.students,
      lecturers: request.body.lecturers,
      materials: request.body.materials,
      courseID: Math.floor(Math.random() * 9000) + 1000,
    }
    await courseModel.create(newCourse).then((result)=>{
      console.log(result)
    });
}
module.exports = {addAdmin, addSuper, addStudent, login, setupCourse}