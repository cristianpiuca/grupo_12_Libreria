const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const productValidator = require('../validations/productsValidations')
const categoriesValidator = require('../validations/categoriesValidation')
const {cart, detail, add, edit, store, update, getByCategory, categorySearch, all, remove, categoryAdd, createCategory, categoryEdit, categoryUpdate, categoryRemove} = require('../controllers/productController')
const adminCheck = require('../middlewares/adminCheck')

/* /products */
router
    .get('/', all)
    .get('/product-cart', cart)
    .get('/product-detail/:id', detail)
    .get('/productAdd', adminCheck , add)
    .post('/productAdd', upload.single('image'),productValidator,store)
    .get('/productEdit/:id', adminCheck ,edit)
    .put('/update/:id',upload.single('image'),productValidator,update)
  
    .delete('/remove/:id', remove)
    .get('/category/:id/',getByCategory)
    .get('/categorySearch', categorySearch)
    .get('/categoryAdd', categoryAdd)
    .post('/categoryAdd',categoriesValidator, createCategory)
    .get('/categoryEdit/:id', categoryEdit)
    .put('/categoryUpdate/:id',categoriesValidator, categoryUpdate)
    .delete('/categoryRemove/:id', categoryRemove)
   




module.exports = router;    
