const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const productValidator = require('../validations/productsValidations')
const {cart, detail, add, edit, store, update, remove, getByCategory, categorySearch, all} = require('../controllers/productController')
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
    .delete('/remove/:id',remove)
    .get('/category/:id/',getByCategory)
    .get('/categorySearch', categorySearch)
module.exports = router;    
