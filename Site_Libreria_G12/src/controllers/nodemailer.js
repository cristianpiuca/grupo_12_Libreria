const nodemailer = require('nodemailer')
const {getUrl} = require('../helpers/getUrl')

module.exports = {
  emailNodemailer :(req,res)=>{
   
    
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
    port: 465,
    secure: true,
   auth: {
      user: 'boulevardlibreria3@gmail.com',
      pass: 'bvygkfpryhgdcprs'
  },
 
});
const mailOptions = {
  from : 'boulevardlibreria3@gmail.com',
  to: req.body.email,
  subject : `Mensaje nuevo de Boulevard`,
  html: `<h1>Ya sos parte de Boulevard</h1>
  <h2>Entrá y enterate de las ofertas</h2>
  <p><img src = "https://i.pinimg.com/564x/b3/ca/2d/b3ca2d9cf82bb7e2a0348f496bcbcd31.jpg" width="350px"></img></p>
  <a href="google.com" style="text-decoration:none;"><h3>Ingresa ahora</h3></a>
  `   
}

     
     transporter.sendMail(mailOptions, (error, info)=>{
      if(error){
        console.log(error)
      }else{
        console.log('email enviado a' + info.response);
      }
     });
      
     
    
  }}
  

 