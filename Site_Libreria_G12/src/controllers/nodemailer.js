const nodemailer = require('nodemailer')
const {getUrl} = require('../helpers/getUrl')


module.exports = {
  emailNodemailer :async(req,res)=>{
    try {
    
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, 
  auth: {
      user: 'obie.gorczany97@ethereal.email',
      pass: '43nwEkEr1HfBB1HJdd'
  },
 
});

transporter.verify().then(() => {
  console.log('ready for send emails')
}).catch(error => console.log(error));
      let { email} = req.body;
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '<obie.gorczany97@ethereal.email>', // sender address
        to: `${email}`, 
        subject: "Hello ✔", // Subject line
        text: "Este es un email de prueba", // plain text body
        html: "<b>Hola</b>", // html body
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
  

 
 
