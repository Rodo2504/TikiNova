const functions = require('firebase-functions');
const nodemailer =  require('nodemailer');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app= express();
app.use(cors({origin:true}));
//app.use(function(req,res, next){
    //res.header('Access-Control-Allow-Origin',"*");
//    res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
  //  res.header('Access-Control-Allow-Origin:', 'http://localhost:4200/');
    //res.header('Access-Control-Allow-Origin:', 'http://localhost:5001/tikinova-a9918/us-central1/mailer');
    //next();
//});
app.post('/',(req,res)=>{
  const { email,subject,message } = req.body;


    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
    });

    const mailOptions = {
      from: email,
      to: 'tikinova123@gmail.com',
      subject: subject+" te esta contactando.",
      text: message+" from: "+email

    };

    transporter.sendMail(mailOptions, (err,data) =>{
        if(err){
            return res.status(500).send({message: "error" +err.message});
        }else{
            return res.send({message: "email sent"});
        }
    })
});

module.exports.mailer = functions.https.onRequest(app);
