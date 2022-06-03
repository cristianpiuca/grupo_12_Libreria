const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const productValidator = require('../validations/productsValidations')
const {cart, detail, add, edit, store, update, remove, list, index} = require('../controllers/productController')

/* /products */
router
    .get('/', index)
    .get('/product-cart', cart)
    .get('/product-detail/:id', detail)
    .get('/productAdd', add)
    .post('/productAdd', upload.single('image'),productValidator,store)
    .get('/productEdit/:id', edit)
    .put('/update/:id',upload.single('image'),productValidator,update)
    .delete('/remove/:id',remove)
    .get('/list', list)

module.exports = router;
