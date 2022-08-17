const express = require('express');
const router = express.Router();
const { addItem  } = require('../controllers/cartController')


/* /api/carts */
    
router
    .post('/add-item', addItem)
    
module.exports = router;