const fs = require('fs');
const path = require('path');
const { validationResult, Result } = require('express-validator')
const { Op } = require('sequelize')
const db = require("../database/models");
let promiseCategories = db.Category.findAll();
module.exports = {

    all: (req, res) => {
        db.Product.findAll(
            {
                order: [['id', 'DESC']],
                include: ['images']   
            }
        )
            .then(products => {
                return res.render('products', {
                    products,
                    user: req.session.userLogin
                })
            })
            .catch(error => console.log(error))
    },

    detail: (req, res) => {
       let categories= db.Category.findAll()
      let product=  db.Product.findByPk(req.params.id, {
            include: ['images']
        })
        Promise.all([product, categories])
            .then(([product, categories]) => {
                return res.render('productDetail', {
                    product,
                    categories,
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
        let errors = validationResult(req)

        if (errors.isEmpty()) {

            let { title, author, price, categoryId, year, language, pages, format, editorial, description } = req.body

            db.Product.create({
                title: title.trim(),
                author: author.trim(),
                price: +price,
                categoryId,
                year: +year,
                language: language.trim(),
                pages: +pages,
                format: format.trim(),
                editorial: editorial.trim(),
                description: description.trim(),

            })
                .then(product => {
                    let image = {
                        file: req.file.filename,
                        productId: product.id
                    }
                    db.Image.create(image, { validate: true })
                        .then((result) => console.log(result))

                    return res.redirect('/users/admin')
                })

                .catch(error => console.log(error))
        } else {
            
            Promise.all([promiseCategories])
            .then(([categories])=>{
                return res.render('productAdd', {
                    categories,
                    user: req.session.userLogin,
                    old: req.body,
                    errors: errors.mapped()
                })
            })
        }
    },

    edit: (req, res) => {

        let product = db.Product.findByPk(req.params.id, {
            include: ['images']
        })
        let categories = db.Category.findAll()

        Promise.all([product, categories])
            .then(([product, categories]) => {
                return res.render('productEdit', {
                    product,
                    categories,
                    user: req.session.userLogin,
                })
            })
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let { title, author, price, categoryId, year, language, pages, format, editorial, description } = req.body

            db.Product.update(
                {
                    title: title.trim(),
                    author: author.trim(),
                    price: +price,
                    categoryId,
                    year: +year,
                    language: language.trim(),
                    pages: +pages,
                    format: format.trim(),
                    editorial: editorial.trim(),
                    description: description.trim()
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            ).then(async () => {
                if (req.file) {
                    try {
                        await db.Image.update(
                            {
                                file: req.file.filename
                            },
                            {
                                where: {
                                    productId: req.params.id,
                                }
                            }
                        )
                    } catch (error) {
                        console.log(error);
                    }
                }
                return res.redirect('/users/admin');

            }).catch(error => console.log(error))
        } else {
            let product = db.Product.findByPk(req.params.id, {
                include: ['images']
            })
            let categories = db.Category.findAll()

            Promise.all([product, categories])
                .then(([product, categories]) => {
                    return res.render('productEdit', {
                        product,
                        categories,
                        user: req.session.userLogin,
                        old : req.body,
                        errors: errors.mapped()
                    })
                })
        }
    },

    remove: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((info) => {
                return res.redirect('/products');
            })
            .catch(error => console.log(error))
    },
    getByCategory: (req, res) => {
        const category = db.Category.findAll({
            where: {
                id: req.params.id
            },

        })
        const products = db.Product.findAll({
            where: {
                categoryId: req.params.id
            },
            include: ['images']
        })
        Promise.all([category, products])
            .then(([category, products]) => {
                return res.render("categories", {
                    category,
                    products,
                    user: req.session.userLogin,

                });
            })
            .catch((error) => console.log(error));
    },

    categorySearch: (req, res) => {
        return res.render('categorySearch',{
            user: req.session.userLogin
        })
    },

    categoryAdd:(req, res) => {
        return res.render('categoryAdd', {
            user: req.session.userLogin
        })
    },

    createCategory:(req, res) =>{
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            
        const { name } = req.body;
        db.Category.create({name})
        .then(() => res.redirect('/users/admin'))
        .catch(error => console.log(error))
        }else {
            res.render('categoryAdd',{
                user: req.session.userLogin,
                errors: errors.mapped()
            })
        }
    },

    categoryEdit:(req, res) =>{
        const id = req.params.id;
        db.Category.findByPk(id)
        .then(category   => {
            res.render('categoryEdit', {
                category,
                user: req.session.userLogin
            })
        })
    },

    categoryUpdate:(req, res) =>{
        let errors = validationResult(req)

        if (errors.isEmpty()) {
        db.Category.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.redirect('/users/admin'))
        .catch(error => console.log(error))
    }else{
        const id = req.params.id;
            db.Category.findByPk(id)
                .then(category => {
                    res.render('categoryEdit', {
                        category, 
                        user: req.session.userLogin,
                        errors: errors.mapped()
                    })
                })
                .catch(error => console.log(error))
    }
    },

    categoryRemove: (req, res) => {
        db.Category.destroy({
                where: {
                    id: req.params.id
                }
               
            })
            .then((info) => {
                return res.redirect('/users/admin');
            })
            .catch(error => console.log(error))
    }



}

