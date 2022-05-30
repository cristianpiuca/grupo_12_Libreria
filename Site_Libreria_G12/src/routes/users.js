const express = require('express');
const router = express.Router();
const {login, register, processRegister, loginUser} = require('../controllers/userController')
const validations = require('../validations/registerValidations')
const loginCheck = require('../validations/loginValidations')

/* /users*/

router
    .get('/register', register)
    .post('/register',validations, processRegister)
    .get('/login', login)
    .post('/login',loginCheck, loginUser)



module.exports = router;
