const fs = require('fs');
const path = require('path');
const { validationResult, Result } = require('express-validator')
const { Op } = require('sequelize')
const db = require("../database/models");
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

                return res.redirect('/')
            })
            .catch(error => console.log(error))
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
                    user: req.session.userLogin
                })
            })
            .catch(error => console.log(error))
    },

    update: (req, res) => {

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
            return res.redirect('/');

        }).catch(error => console.log(error))

    },

    remove: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((info) => {
                return res.redirect('/')
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
        return res.render('categorySearch', {
            user: req.session.userLogin
        })
    }

}