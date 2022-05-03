var express = require('express');
var router = express.Router();
const {login, register} = require('../controllers/userController')

<<<<<<< HEAD
const {register,login} = require('../controllers/usersControllers');

/* /users*/
router.get('/register', register);
router.get('/login', login)
=======
/* /users */
router.get('/register', register);
router.get('/login', login);
>>>>>>> 30d7efa7045a707582b8c15cfc09f1eca4bd2579

module.exports = router;
