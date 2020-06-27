const functions = require('firebase-functions');
const nodemailer =  require('nodemailer');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app= express();
app.use(cors({origin:true}));

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
///////////// QR API
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

db.settings({timestampsInSnapshots:true});




exports.qrapi = (req, res) => {


  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {

   db.collection('Descuentos').get().then((snapshot) =>{
  snapshot.docs.forEach(doc =>{})
  res.send(snapshot.docs);
});

  }
};
/// GRAFICA API


const datab = admin.firestore();


exports.grafica = (req, res) => {


  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {

   db.collection('Pedidos').get().then((snapshot) =>{
  snapshot.docs.forEach(doc =>{})
  res.send(snapshot.docs);
});

  }
};
