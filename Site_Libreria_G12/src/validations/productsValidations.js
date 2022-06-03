const {body} = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({min : 4}).withMessage('Mínimo 4 caracteres'),
    body('author')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({min : 6}).withMessage('Mínimo 6 caracteres'),
    body('price')
        .notEmpty().withMessage('Debes completar este campo').bail()
        ,
    body('category')
        .notEmpty().withMessage('Debes completar este campo').bail(),
    body('year')
        .notEmpty().withMessage('Debes completar este campo').bail()
        ,
    body('language')
        .notEmpty().withMessage('Debes completar este campo').bail()
       ,
    body('pages')
        .notEmpty().withMessage('Debes completar este campo').bail()
        ,
    body('format')
        .notEmpty().withMessage('Debes completar este campo').bail(),
    body('editorial')
        .notEmpty().withMessage('Debes completar este campo').bail(),
    body('description')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({min : 50}).withMessage('Mínimo insuficiente. Escribe más'),
   
        
]