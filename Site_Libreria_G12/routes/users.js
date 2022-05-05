var express = require('express');
var router = express.Router();
const {login, register, password} = require('../controllers/userController')

/* /users*/
router.get('/register', register);
router.get('/login', login)
router.get('/password', password)
module.exports = router;
