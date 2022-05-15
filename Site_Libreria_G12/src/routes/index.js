var express = require('express');
var router = express.Router();
const {index,login,register} = require('../controllers/indexController');

/* / */
router.get('/', index);
router.get('/login', login);
router.get('/register', register);
module.exports = router;

