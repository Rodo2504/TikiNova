const functions = require('firebase-functions');
const nodemailer =  require('nodemailer');
const xoauth2 = require('xoauth2')
const express = require('express');
require('dotenv').config();
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


   /* const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
              xoauth2: xoauth2.createXOAuth2Generator({
                user: 'tikinova123@gmail.com',
                clientId: '980610006248-f03bs56pvdnsnht5btmsicespil7m1oj.apps.googleusercontent.com',
                clientSecret: 'ARBOe8JEaf3qDHrnphQODSUl',
                refreshToken:'1//04P_zDzv2lSINCgYIARAAGAQSNwF-L9IrD7BMzlancam-p3H8sf0XuOXpj7_xIslTX8ulCJu2WW1xdmP7Krmhg9SnM_Y1QRsg6GQ'
              })

            }
    });*/

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
