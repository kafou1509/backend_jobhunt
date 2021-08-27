/*const nodemailer = require("nodemailer");
const config = require("../config/Auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "adrar.nabila01@gmail.com",
    pass: pass,
  },
*/



  const nodemailer = require("nodemailer");
  const path = require('path')


  require("dotenv").config({
   path: path.join(__dirname, "../.env")
  })
  //ceate a transporter
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
      auth: {

      type: 'OAuth2',
      user: process.env.EMAIL_USERNAME,
      clientId: '000000000000-xxx0.apps.googleusercontent.com',
      clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0',
      refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
      accessToken: process.env.thisisasamplesecret,
      expires: 1484314697598
      },
    });

    // create a send email option
    let info = ({
      from: 'nabila.adrar@se.univ-bejaia.dz', // sender address
      to: "ADRAR00@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });



//export transporter
transporter.sendMail(info , function(err, data){
  if (err){
    console.log('error occurs',err);
  }else {
    console.log('Email sent !!');
  }
});
