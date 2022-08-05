var express = require('express');
var router = express.Router();
const {index, search, about, contact} = require('../controllers/indexController');

/* home */
router
    .get('/', index)
    .get('/result', search)
    .get('/about',about)
    .get('/contact',contact)
module.exports = router;

