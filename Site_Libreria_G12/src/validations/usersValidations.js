const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Debes poner tu nombre').bail(),
    body('lastname')
        .notEmpty().withMessage('Debes poner tu apellido').bail(),
   /* body('birth')
        .notEmpty().withMessage('Elije una fecha').bail(),
    body('adress')
        .notEmpty().withMessage('Debes poner un domicilio').bail(),
    body('state')
        .notEmpty().withMessage('Seleccione una provincia').bail(),
    body('phone')
       .notEmpty().withMessage('Debes poner un numero de teléfono').bail() 
        .isNumeric().withMessage('Solo se permiten números')
        .isLength({min : 10}).withMessage('Mínimo 10 numeros') */
]