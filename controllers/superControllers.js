const jwt = require('jsonwebtoken');
const superModel = require("../models/superModel");
const adminModel = require("../models/adminModel")
const studentModel = require("../models/studentModel")
const courseModel = require("../models/courseModel")
const materialModel = require("../models/materialModel")

const { createHash } = require('crypto');
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");
const sha256 = require('sha256');
const { CountQueuingStrategy } = require('stream/web');
const { all } = require('../routes/superRouter');
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
  const newCourse = {
    courseCode: request.body.courseCode,
    students: request.body.students,
    lecturers: request.body.lecturers,
    materials: request.body.materials,
    matricNumbers: request.body.matricNumbers,
    courseID: Math.floor(Math.random() * 9000) + 1000,
  }
  const courseCode = request.body.courseCode
  console.log(newCourse)
  const find = await courseModel.find({courseCode: courseCode})

  if (find.length == 0) {
    await courseModel.create(newCourse).then((result)=>{
      console.log(result)
      response.send(`successful setup of ` + courseCode)
    });
  } else {
    response.send("Course already in database")
  }
}
 const removeUser = async (request,response) =>{
  console.log(request.params.ID)

  const a = await studentModel.deleteOne({ID:request.params.ID})
  const b = await adminModel.deleteOne({ID:request.params.ID})
  const c = await superModel.deleteOne({ID:request.params.ID})

  console.log({a,b,c})
  if (a.deletedCount == 1 || b.deletedCount == 1 || c.deletedCount == 1) {
    response.send("done")
  } else {
    response.send("Nothing")
  }
  
}

const getAllUsers = async (request,response) =>{
  const allStudents = await studentModel.find()
  const allLecturers = await adminModel.find()
  const allMaterials = await materialModel.find()
  const allCourses = await courseModel.find()
  const Admins = await superModel.find()
  response.send({students: allStudents, lecturers: allLecturers, materials: allMaterials, courses: allCourses, superusers: Admins})
  console.log({students: allStudents, lecturers: allLecturers, materials: allMaterials, courses: allCourses, superusers: Admins})

}



const addToCourse = async (request, response) =>{
    console.log(request.body)
    newStudents= request.body.students
    newLecturers = request.body.lecturers
    newMaterials = request.body.materials
    const courseCode = request.body.courseCode
    const find = await courseModel.find({courseCode: courseCode})
    if (find.length == 0) {
      console.log("Not found")
    } else {
      const students = find[0].students
      const lecturers = find[0].lecturers
      const materials = find[0].materials
      if (newStudents) {
        newStudents.forEach(element => {
          var filtered = materials.filter(students=>students == element); 
          console.log(filtered);
          if(filtered.length==0){
            students.push(element)

          }
          else{

          }
        });       
      }
      if (newLecturers) {
        newLecturers.forEach(element => {
          var filtered = lecturers.filter(lecturers=>lecturers == element); 
          console.log(filtered);
          if(filtered.length==0){
            lecturers.push(element)
 
          }
          else{

          }
        });             
      }
      if (newMaterials) {
        newMaterials.forEach(element => {
        var filtered = materials.filter(materials=>materials == element); 
        console.log(filtered);
        if(filtered.length==0){
          materials.push(element)
        }
        else{
          
        }
      });
      response.send("done")
      
    }
    
      newDetails = {students, lecturers, materials, courseCode}
      // console.log(newDetails)
      const replace = await courseModel.replaceOne({courseCode: courseCode}, newDetails)
      // console.log(replace)
    }

}

 const userInfo = async (request,response)=> {
  console.log(request.params.ID)
  let all = []
  const allStudents = await studentModel.findOne({ID:request.params.ID})
  const allLecturers = await adminModel.findOne({ID:request.params.ID})
  const Admins = await superModel.findOne({ID:request.params.ID})
  if (allStudents !== null) {
    all.push(allStudents)
  }
  if (allLecturers!==null) {
    all.push(allLecturers)
  }
  if (Admins!== null){
    all.push(Admins)  
  }
  console.log(all)
  if (all[0]==null) {
    response.send("no user found")
  } else {
    response.send(all[0])
    
  }
 }
module.exports = {addAdmin, addSuper, addStudent, login, setupCourse, addToCourse, removeUser, getAllUsers, userInfo}