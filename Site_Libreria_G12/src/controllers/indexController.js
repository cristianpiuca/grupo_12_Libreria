const path = require('path')
const fs = require('fs')
const products = require('../data/products')


module.exports = {
    index :(req,res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','products.json')));

        return res.render('index', {
            products  
        })
    },
   
    login :(req, res) => res.render('login'),
    register :(req, res) => res.render('register'),
    
    search : (req,res) => {
        const {keyword} = req.query;
        const result = products.filter(product => (product.name.toLowerCase().includes(keyword.toLowerCase()))||(product.author.toLowerCase().includes(keyword.toLowerCase())))
        //return res.send(result)
        return res.render('result', {
            products : result,
            keyword
        })
    }
   
}