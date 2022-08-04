const {body} = require('express-validator');

module.exports = [
    body('title')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({min : 4}).withMessage('Mínimo 4 caracteres'),
    body('author')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({min : 6}).withMessage('Mínimo 6 caracteres')
        .isAlpha().withMessage('Formato con caracteres no permitidos'),
    body('price')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isNumeric().withMessage('Deben ser solo numeros'),
    body('categoryId')
        .notEmpty().withMessage('Debes completar este campo').bail()
        ,
    body('year')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isNumeric().withMessage('Deben ser solo numeros'),
    body('language')
        .notEmpty().withMessage('Debes completar este campo').bail()
      ,
    body('pages')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isNumeric().withMessage('Deben ser solo numeros'),
    body('format')
        .notEmpty().withMessage('Debes completar este campo').bail()
       ,
    body('editorial')
        .notEmpty().withMessage('Debes completar este campo').bail()
        ,
    body('description')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({min:20}).withMessage('La descripcion debe ser más larga'),    
]