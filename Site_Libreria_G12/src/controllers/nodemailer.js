const nodemailer = require('nodemailer')
const {getUrl} = require('../helpers/getUrl')


module.exports = {
  emailNodemailer :async(req,res)=>{
    try {
    
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
    port: 465,
    secure: true,
   auth: {
      user: 'libreriaboulevard22@gmail.com',
      pass: 'iixfyacsskokrnlq'
  },
 
});

transporter.verify().then(() => {
  console.log('ready for send emails')
}).catch(error => console.log(error));
      let { email} = req.body;
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '<libreriaboulevard22@gmail.com>', // sender address
        to: `${email}`, 
        subject: "Bienvenidx a Boulevard ✔", // Subject line
        text: "Este es un email de prueba", // plain text body
        
      html: `<h1>Gracias por formar parte de Boulevard</h1>
            
             <p><img src = "https://i.pinimg.com/564x/b3/ca/2d/b3ca2d9cf82bb7e2a0348f496bcbcd31.jpg" width="350px"></img></p>
             <a href="google.com" style="text-decoration:none;"><h3>Ingresa ahora</h3></a>
             `
        
            
      });
    
      let response = {
        ok:true,
        meta : {
          status : 200,
        },
        url : getUrl(req),
        msg : `el mail se envio correctamente a ${email}`
      }
      return res.status(200).json(response);
    } catch (error) {
      let response = {
        ok: false,
        meta: {
            status: 500,
        },
        url: getUrl(req),
        msg: error.message ? error.message : "comuniquese con el administrador"
    }
    return res.status(500).json(response);    
  }
  }}
  

 