<<<<<<< HEAD
const fs = require('fs');
const path = require('path');
const products = require('../data/products.json')
const categories = require('../data/categories')
const {validationResult} = require('express-validator')

const db = require("../database/models");
=======
const db = require('../database/models/')
const { validationResult } = require('express-validator')
>>>>>>> crudCristian
module.exports = {
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['images']
        })
            .then(product => {
                return res.render('productDetail', {
                    product,
                    user: req.session.userLogin
                })
            })
            .catch(error => console.log(error))

    },
    cart: (req, res) => {
        res.render('productCart', {
            user: req.session.userLogin
        })
    },

    add: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                return res.render('productAdd', {
                    categories,
                    user: req.session.userLogin
                })
            })
            .catch(error => console.log(error))
    },

    store: (req, res) => {

        let { title, author, price, categoryId, year, language, pages, format, editorial, description } = req.body

        db.Product.create({
            title : title.trim(),
            author : author.trim(),
            price : +price,
            categoryId,
            year : +year,
            language : language.trim(),
            pages : +pages,
            format : format.trim(),
            editorial : editorial.trim(),
            description : description.trim()
        })
        .then(product => {
            if(req.files.length > 0){
                let images = req.files.map(({filename},i) => {
                    let image = {
                        file : filename,
                        productId : product.id,
                        primary : i === 0 ? 1 : 0
                    }
                    return image
                })
                db.Image.bulkCreate(images,{validate :true})
                    .then( (result) => console.log(result))		
            }else{
                db.Image.create({
                    file : "default-image.png",
                    productId : product.id

                })
            }
            return res.redirect('/')
        })
        .catch(error => console.log(error))
    },

        edit: (req, res) => {

            let product = db.Product.findByPk(req.params.id,{
                include : ['images']
            })
            let categories = db.Category.findAll()
    
            Promise.all([product,categories])
                .then(([product,categories]) => {
                    return res.render('productEdit',{
                        product,
                        categories,
                        user: req.session.userLogin
                    })
                })
                .catch(error => console.log(error))

      
        },
        update: (req, res) => {

            let { title, author, price, categoryId, year, language, pages, format, editorial, description } = req.body

            db.Product.update(
                {
                    title : title.trim(),
                    author : author.trim(),
                    price : +price,
                    categoryId,
                    year : +year,
                    language : language.trim(),
                    pages : +pages,
                    format : format.trim(),
                    editorial : editorial.trim(),
                    description : description.trim()
                },
                {
                    where : {
                        id : req.params.id
                    }
                }
                ).then(async () => {
                    if(req.file){
                        try {
                            await db.Image.update(
                                {
                                    file : req.file.filename
                                },
                                {
                                    where : {
                                        productId : req.params.id,
                                        primary : true
                                    }
                                }
                            )
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    return res.redirect('/');
        
                }).catch(error => console.log(error))
           
        },
    remove: (req, res) => {
        db.Product.destroy({
            where : {
                id : req.params.id
            }
        })
        .then((info) => {
            return res.redirect('/')
        })
        .catch(error => console.log(error))

    },
    list: (req, res) => {
<<<<<<< HEAD
        db.Product.findAll(
            { include : ['images']}
           )
             .then(products => {
                 return res.render('products', {
                    products,
                     user: req.session.userLogin
                 })
             })
             .catch(error => console.log(error)) 
      
    },
    index: (req, res) => {
        return res.render('products')
    },
    getByCategory: (req, res) => {
   
        const category = db.Category.findAll({
          where : {
            id : req.params.id
          },
         
        })
        const products = db.Product.findAll({
          where : {
            categoryId : req.params.id
          },
          include : ['images']
        })
        Promise.all([category,products])
        .then(([category,products]) => {
          return res.render("categories", {
            category,
             products,
             user: req.session.userLogin,
             
           });
        })
        .catch((error) => console.log(error));
       
      },
      categorySearch : (req,res) => {
       
        return res.render('categorySearch', {
            user: req.session.userLogin,
        })
      }
=======
        db.Product.findAll({
            include: ['images']
        })
            .then(products => {
                return res.render('products', {
                    products,
                    user: req.session.userLogin
                })
            })
            .catch(error => console.log(error))
    },
    index: (req, res) => {

        db.Product.findAll({
            include: ['images']
        })
            .then(products => {
                return res.render('products', {
                    products,
                    user: req.session.userLogin
                })
            })
            .catch(error => console.log(error))
    }
>>>>>>> crudCristian
}