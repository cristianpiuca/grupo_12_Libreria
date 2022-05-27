const express = require('express');
const router = express.Router();
const {login, register, password, processRegister} = require('../controllers/userController')
const validations = require('../validations/registerValidations')


/* /users*/

router
    .get('/register', register)
    .post('/register',validations, processRegister)
    .get('/login', login)
    .get('/password', password)



module.exports = router;
