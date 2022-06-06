const express = require('express');
const router = express.Router();
const {login, register, processRegister, loginUser, logout, profile, edit, update} = require('../controllers/userController')
const validations = require('../validations/registerValidations') 
const loginCheck = require('../validations/loginValidations')

/* /users*/

router
    .get('/register', register)
    .post('/register',validations, processRegister)
    .get('/login', login)
    .post('/login',loginCheck, loginUser)
    .get('/logout', logout)
    .get('/profile/:id', profile)
    .get('/profileEdit/:id', edit)
    .put('/update/:id', update)



module.exports = router;
