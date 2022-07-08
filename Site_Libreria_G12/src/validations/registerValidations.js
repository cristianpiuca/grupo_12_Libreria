const { body} = require('express-validator');
const db = require("../database/models");

module.exports = [
    body('name')
        .isLength({min: 4}).withMessage('Como mínimo cuatro letras').bail()
        .isAlpha().withMessage('Solo letras están permitidas'),
    body('lastname')
        .isLength({min: 4}).withMessage('Como mínimo cuatro letras').bail()
        .isAlpha().withMessage('Solo letras están permitidas'),
    body("email")
        .notEmpty()
        .withMessage("Debes usar  un email")
        .bail()
        .isEmail()
        .withMessage("Debe ser un email real")
        .custom(value => {
            //compare if email exists, reject register
          return db.User.findOne({
            where : {
              email : value
            }
          }).then(user => {
            if(user){
              return Promise.reject()
            }
          }).catch(() => Promise.reject('Este email ya se encuentra registrado, inica sesión'))
      }),
        body('password')
        /* .isAlphanumeric().withMessage('Debe contener letras y números') */
        .isLength({min : 6, max : 12}).withMessage('Debe contener entre 6 y 12 caracteres'),
    body('password2')
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden'),
    body('terminos')
        .isString('on')
        .withMessage('Debes aceptar términos y condiciones')
]