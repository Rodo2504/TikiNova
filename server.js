require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.post('/contacto', (req, res)=>{

  const { email,subject,text } = req.body;
  console.log('Data:', req.body);
  res.json({message:'Message received'});

  sendMail(email,subject,text, function(err, data){
    if(err){
      res.status(500).json({message: 'Error Interno'});
    }else{
      res.json({message: 'Se envio el Correo'});
    }
  });
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','app', 'components', 'contacto','contacto.component.html'));
});

app.listen(PORT, () =>console.log('Server is starting on PORT,'+PORT));

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
       user: process.env.EMAIL,
       pass: process.env.PASSWORD
    }
});
const sendMail = (email, subject, text, cb) =>{
  const mailOptions = {
    from: email,//aqui ponemos el correo del contacto
    to: 'tikinova123@gmail.com',//ponemos correo de nosotros
    subject: subject+' te esta contactando.',
    text
  }

  transporter.sendMail(mailOptions,function(err,data){
    if(err){
      cb(err, null);
    }else{
      cb(null, data);
    }
  })
}

sendMail('', '', '', function(err,data){

});



