var express = require('express');
var router = express.Router();

const {register,login} = require('../controllers/usersControllers');

/* /users*/
router.get('/register', register);
router.get('/login', login)

module.exports = router;
