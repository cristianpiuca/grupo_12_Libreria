var express = require('express');
const { route } = require('.');
var router = express.Router();
const {login, register, password, profile, profileEdit, updateUser} = require('../controllers/userController')

/* /users*/
router.get('/register', register);
router.get('/login', login);
router.get('/password', password);
router.get('/profile', profile);
router.get('/profileEdit', profileEdit)
module.exports = router;
