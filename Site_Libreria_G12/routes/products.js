var express = require('express');
var router = express.Router();
const {cart, detail, add, edit} = require('../controllers/productController')

/* /products */
router.get('/product-cart', cart);
router.get('/product-detail/:id', detail);
router.get('/productAdd', add);
router.get('/productEdit', edit);
module.exports = router;
