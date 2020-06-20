const functions = require('firebase-functions');
const nodemailer =  require('nodemailer');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app= express();
app.use(cors());
app.use(function(req,res, next){
    res.header('Access-Control-Allow-Origin',"*");
//    res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
  //  res.header('Access-Control-Allow-Origin:', 'http://localhost:4200/');
    //res.header('Access-Control-Allow-Origin:', 'http://localhost:5001/tikinova-a9918/us-central1/mailer');
    next();
});
app.post('/mailer',(req,res)=>{
    const {body} = req;
    const isValidMessage = body.email && body.subject && body.message;

    if(!isValidMessage){
        return res.status(400).send({message: ' invalid request'});

    }

    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
    });

    const mailOptions = {
        from: body.email,
        to: 'tikinova123@gmail.com',
        subject: body.subject,
        text: body.message

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
