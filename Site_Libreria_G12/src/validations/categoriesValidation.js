const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Debes poner una categoria').bail()
        .isLength({min : 5}).withMessage('La categoria debe tener 5 caracteres minimo')
]