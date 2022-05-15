const products = require('../data/products')


module.exports = {
    index :(req,res) => {
        return res.render('index', {
            products  
        })
    },
   
    login :(req, res) => res.render('login'),
    register :(req, res) => res.render('register'),
   
}