
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
    const submit = async(request,response) =>{
        console.log(request.body)
        
    }

module.exports = {submit};
