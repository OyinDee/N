
const cloudinary = require('cloudinary')

const jwt = require('jsonwebtoken');
const assignmentModel = require("../models/assignmentModel");
const { createHash } = require('crypto');
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");
const sha256 = require('sha256')
const JWT_SECRET = process.env.JWT_SECRET
const JWT_KEY = process.env.JWT_KEY


    // Configuration
    cloudinary.config({ 
        cloud_name: "dol47ucmj", 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET 
    });
    
    // Upload an image
    const create = async(request,response) =>{
        const ID =  Math.floor(Math.random() * 9000) + 1000;
        console.log(request.body)
        const newsAssignment = {
            courseID: request.body.courseID,
            body: request.body.body,
            deadline: request.body.date,
            title: request.body.title,
            ID: ID,
        }
        assignmentModel.create(newsAssignment)
        response.send("submitted")
    }
    const submit =(request,response)=>{
        console.log(request.body)
        const body = []
        request.on('data', (chunk) => {

            // Saving the chunk data at server
            body.push(chunk);
            console.log(body)
         });
         request.on('end', () => {
            // // Parsing the chunk data in buffer
            // const parsedBody = Buffer.concat(body).toString();
            // const message = parsedBody.split('=')[1];
            // resolve(parsedBody);
            // // Printing the data
            // console.log(message);
            return new Promise((resolve, reject) => {

                const form = formidable({ multiples: true })
                form.parse(request, (error, fields, files) => {
                  if (error) {
                    reject(error);
                    return;
                  }
                  resolve({ ...fields, ...files });
                });
              })
         });
    }

module.exports = {submit,create};
