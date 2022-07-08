var express = require('express');
var router = express.Router();
const {index, search} = require('../controllers/indexController');

/* home */
router
    .get('/', index)
    .get('/result', search)

module.exports = router;

