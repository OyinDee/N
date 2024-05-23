const jwt = require('jsonwebtoken');
const studentModel = require("../models/studentModel");
const { createHash } = require('crypto');
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");
const sha256 = require('sha256')


// for emAIL VERIFICATION

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

// @desc student register
// @route POST /api/v1/user/register
// @access public
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
    };

    const emailExists = await studentModel.find({ email: newUser.email });


    if (emailExists.length > 0) {
      console.log("Email exists");
      response.send({ message: `Email already exists.`, text: 'no' });
    }  else {
      response.send({ message: 'Success', text: 'yes' });
                                                                            

      await studentModel.create(newUser).then((result)=>{
        console.log(result)
      });
    }
  
}
    
  

  const logout = () =>{

  }
  
  const login = () =>{

  }

  const validate_token = () => {

  }
  
  module.exports = { login, register, logout, validate_token };