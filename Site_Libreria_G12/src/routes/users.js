const express = require('express');
const router = express.Router();
const {login, register, processRegister, loginUser, logout, profile, edit, update} = require('../controllers/userController')
const validations = require('../validations/registerValidations') 
const loginCheck = require('../validations/loginValidations')
const upload = require('../middlewares/multer')
const userValidator = require('../validations/usersValidations')
const {inSession, offSession} = require('../middlewares/sessionCheck')



/* /users*/

router
    .get('/register', inSession ,register)
    .post('/register', validations, processRegister)
    .get('/login', inSession ,login)
    .post('/login',loginCheck, loginUser)
    .get('/logout', logout)
    .get('/profile/:id', offSession, profile)
    .get('/profileEdit/:id', edit)
    .put('/update/:id',upload.single('img'),userValidator,update)



module.exports = router;
