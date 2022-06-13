const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Debes poner tu nombre').bail()
        .isAlpha().withMessage('Solo se permiten letras'),
    body('lastname')
        .notEmpty().withMessage('Debes poner tu apellido').bail()
        .isAlpha().withMessage('Solo se permiten letras'),
    body('birth')
        .notEmpty().withMessage('Elije una fecha').bail(),
    body('direction')
        .notEmpty().withMessage('Debes poner un domicilio').bail(),
    body('province')
        .notEmpty().withMessage('Seleccione una provincia').bail(),
        body('tel')
        .notEmpty().withMessage('Debes poner un numero de teléfono').bail() 
        .isNumeric().withMessage('Solo se permiten números')
]