const fs = require('fs');
const path = require('path');
const products = require('../data/products.json')
const categories = require('../data/categories')

module.exports = {
    detail : (req,res) => {

        const {id} = req.params;

        const product = products.find(product => product.id === +id)


        return res.render('productDetail',{
            product,
           categories
        })
    },
    cart : (req, res) => res.render('productCart'),

    add : (req,res) => {
        return res.render('productAdd', {
            categories
        })
    },
    store : (req,res) => {
        let {name, author, price, category, year, language, pages, format, editorial, description} = req.body
        let lastID = products[products.length -1].id 

        let addProduct = {
            id : +lastID +1,
            name : name.trim(),
            author : author.trim(),
            price : +price,
            category : category.trim(),
            year : +year,
            language : language.trim(),
            pages : +pages,
            format :format.trim(),
            editorial : editorial.trim(),
            description : description.trim(),
            img: req.file ? req.file.filename : "noimage.jpeg"
        }
        products.push(addProduct)
        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8')
        
        

        return res.redirect('/')
    },
    edit : (req,res) => {

        const {id} = req.params;
        const product = products.find(product => product.id === +id);

        return res.render('productEdit',{
            product,
            categories
        })
    },
    update : (req,res) => {
        
        const {id} = req.params;
        let {name, author, price, category, year, language, pages, format, editorial, description} = req.body

        const productsUpdate = products.map(product => {
            if (product.id === +id) {
                let productUpdate = {
                    ...product,
                    name: name, 
                    author: author, 
                    price : +price, 
                    category: category, 
                    year: +year, 
                    language :language, 
                    pages : +pages, 
                    format :format, 
                    editorial :editorial, 
                    description: description,
                    img : req.file ? req.file.filename : product.img,
                }
                if(req.file){
                    if(fs.existsSync(path.resolve(__dirname,'..','public','images',product.img)) && product.img !== "noimage.jpeg"){
                        fs.unlinkSync(path.resolve(__dirname,'..','public','images',product.img))
                    }
                }
                return productUpdate
            }
            return product
        })

        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(productsUpdate,null,3),'utf-8')

        return res.redirect('/')
    },
    remove : (req,res) => {
        const {id} = req.params
        const productDelete = products.filter(product => product.id !== +id) 
        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(productDelete,null,3),'utf-8')

        return res.redirect('/')
    }
    
}
