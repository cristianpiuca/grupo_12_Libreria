const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const {cart, detail, add, edit, store, update, remove, list, products, index} = require('../controllers/productController')

//multer config
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage
})


/* /products */
router
    .get('/', index)
    .get('/product-cart', cart)
    .get('/product-detail/:id', detail)
    .get('/productAdd', add)
    .post('/productAdd', upload.single('image'),store)
    .get('/productEdit/:id', edit)
    .put('/update/:id',upload.single('image'),update)
    .delete('/remove/:id',remove)
    .get('/list', list)

module.exports = router;
