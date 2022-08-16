const {body} = require('express-validator');

module.exports = [
    body('title')
        .notEmpty().withMessage('Debes poner un titulo').bail()
        .isLength({min : 3, max: 50}).withMessage('El titulo tiene que ser de 3 a 50 caracteres'),
    body('author')
        .notEmpty().withMessage('Debes poner un autor').bail()
        .isLength({min : 4, max: 30}).withMessage('El autor tiene que ser de 4 a 30 caracteres, solo letras, puede contener acentos'),
      
    body('price')
        .notEmpty().withMessage('Debes poner un precio').bail()
        .isNumeric().withMessage('Solo se permiten números')
        .isNumeric({min : 4}).withMessage('El precio tiene que contener 4 caracteres, solo números.'),
    body('categoryId')
        .notEmpty().withMessage('Debes seleccionar una categoria').bail(),
    body('year')
        .notEmpty().withMessage('Debes poner el año').bail()
        .isNumeric().withMessage('Solo se permiten números')
        .isNumeric({min : 4}).withMessage('El año tiene que contener 4 caracteres, solo números.'),
    body('language')
        .notEmpty().withMessage('Debes poner un idioma').bail(),
    body('pages')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isNumeric().withMessage('Solo se permiten números')
        .isNumeric({min : 2, max : 4}).withMessage('El número de paginas tiene que de contener de 2 a 4 caracteres, solo números.'),
    body('format')
        .notEmpty().withMessage('Debes seleccionar un formato').bail(),
    body('editorial')
        .notEmpty().withMessage('Debes poner una editorial').bail()
        .isLength({min : 4, max : 30}).withMessage('La editorial tiene que contener de 4 a 30 caracteres, solo letras.'),
    body('description')
        .notEmpty().withMessage('Debes poner una descripción').bail()
        .isLength({min:20, max: 500}).withMessage('La descripción tiene que contener 20 a 500 caracteres.')
]