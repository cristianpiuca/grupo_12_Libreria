var express = require('express');
var router = express.Router();
const {cart, detail} = require('../controllers/productController')

/* /products */
router.get('/product-cart', cart);
router.get('/product-detail', detail);

module.exports = router;
