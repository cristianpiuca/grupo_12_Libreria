const fs = require('fs');
const path = require('path');
const products = require('../data/products.json')
const categories = require('../data/categories')
const {validationResult} = require('express-validator')

module.exports = {
    detail: (req, res) => {

        const { id} = req.params;

        const product = products.find(product => product.id === +id)

        


        return res.render('productDetail', {
            product,
            categories,
            user: req.session.userLogin
        })
    },
    cart: (req, res) => {
        res.render('productCart',{
            user: req.session.userLogin
        })
    },
     
    add: (req, res) => {
        return res.render('productAdd', {
            categories,
            user: req.session.userLogin
        })
    },

    store: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let {
                name,
                author,
                price,
                category,
                year,
                language,
                pages,
                format,
                editorial,
                description
            } = req.body
            let lastID = products[products.length - 1].id

            let addProduct = {
                id: +lastID + 1,
                name: name.trim(),
                author: author.trim(),
                price: +price,
                category: category.trim(),
                year: +year,
                language: language.trim(),
                pages: +pages,
                format: format.trim(),
                editorial: editorial.trim(),
                description: description.trim(),
                img: req.file ? req.file.filename : "noimage.jpeg"
            }

            products.push(addProduct)
            fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 3), 'utf-8')

            return res.redirect('/')
        }else {
            return res.render("productAdd", {
                categories,
                errors: errors.mapped(),
                old: req.body,
            });
        }

    },
    edit: (req, res) => {

        const {
            id
        } = req.params;
        const product = products.find(product => product.id === +id);

        return res.render('productEdit', {
            product,
            categories,
            user: req.session.userLogin
        })
    },
    update: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
             const {id} = req.params;
        let {
            name,
            author,
            price,
            category,
            year,
            language,
            pages,
            format,
            editorial,
            description
        } = req.body

        const productsUpdate = products.map(product => {
            if (product.id === +id) {
                let productUpdate = {
                    ...product,
                    name: name,
                    author: author,
                    price: +price,
                    category: +category,
                    year: +year,
                    language: language,
                    pages: +pages,
                    format: format,
                    editorial: editorial,
                    description: description,
                    img: req.file ? req.file.filename : product.img,
                }
                if (req.file) {
                    if (fs.existsSync(path.resolve(__dirname, '..', 'public', 'images', product.img)) && product.img !== "noimage.jpeg") {
                        fs.unlinkSync(path.resolve(__dirname, '..', 'public', 'images', product.img))
                    }
                }
                return productUpdate
            }
            return product
        })

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsUpdate, null, 3), 'utf-8')

        return res.redirect('/')
        }else{
            return res.render("productEdit", {
                categories,
                product : req.body,
                errors : errors.mapped()
              });
        }
       
    },
    remove: (req, res) => {
        const {
            id
        } = req.params
        const productDelete = products.filter(product => product.id !== +id)
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(productDelete, null, 3), 'utf-8')

        return res.redirect('/')
    },
    list: (req, res) => {
        return res.render('products', {
            products,
            user: req.session.userLogin
            
        })
    },
    index: (req, res) => {
        return res.render('products')
        
    },


}