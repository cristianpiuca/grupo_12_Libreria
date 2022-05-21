var express = require('express');
var router = express.Router();
const {index,login,register, search} = require('../controllers/indexController');

/* / */
router
    .get('/', index)
    .get('/login', login)
    .get('/register', register)
    .get('/result', search)

module.exports = router;

