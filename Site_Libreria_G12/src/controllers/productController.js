const products = require('../data/products')
module.exports = {
    detail : (req,res) => {

        const {id} = req.params;

        const product = products.find(product => product.id === +id)

        return res.render('productDetail',{
            product
        })
    },
    cart : (req, res) => res.render('productCart'),
    add : (req,res) => res.render('productAdd'),
    edit : (req,res) => res.render('productEdit'),
    
}
