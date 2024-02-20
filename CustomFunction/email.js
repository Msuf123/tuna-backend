const nodemailer=require('nodemailer')
const transpoter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:'xrobo17@gmail.com'
        ,pass:'eszy uxye ioln gfeo '
    }
})
var mailOptions = {
    from: 'xrobo17@gmail.com',
    
    subject: 'Sending Email using Node.js',
    text: 'No notken'
  };
  function sendEmail(senderEmail,token){
      mailOptions.to=senderEmail
      mailOptions.text=`Click on Link to verify-: http://localhost:3000/register/verify?token=${token}`
      transpoter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });}
  module.exports=sendEmail
  