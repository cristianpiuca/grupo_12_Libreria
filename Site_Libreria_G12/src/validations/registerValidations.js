const { body} = require('express-validator');
const usuarios = require('../data/users.json')

module.exports = [
    body('name')
        .isLength({min: 4}).withMessage('Como mínimo cuatro letras').bail()
        .isAlpha().withMessage('Solo letras porfa!'),
    body('email')    
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no válido')
        .custom((value) => {
            const usuario = usuarios.find(usuario => usuario.email === value);
            if(usuario){
                return false
            }else{
                return true
            }
        }).withMessage('El email ya está registrado!'),
    body('password')
        /* .isAlphanumeric().withMessage('Debe contener letras y números') */
        .isLength({min : 6, max : 12}).withMessage('Debe contener entre 6 y 12 caracteres'),
    body('password2')
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden!!'),
    body('terminos')
        .isString('on')
        .withMessage('Debes aceptar términos y condiciones')
]