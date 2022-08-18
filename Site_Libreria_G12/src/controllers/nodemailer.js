const nodemailer = require('nodemailer')
const {getUrl} = require('../helpers/getUrl')

module.exports = {
  emailNodemailer :(req,res)=>{
   
    
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
    port: 465,
    secure: true,
   auth: {
      user: 'libreria.boulevard.2022@gmail.com',
      pass: 'bxgdgcayrgxjusdr'
  },
 
});
const mailOptions = {
  from : req.body.email,
  to: 'libreria.boulevard.2022@gmail.com',
  subject : `mensaje de ${req.body.email}: ${req.body.subject}`,
  text : `${req.body.message}`,
  html: `<h1>Gracias por formar parte de Boulevard</h1>
            
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
  

 