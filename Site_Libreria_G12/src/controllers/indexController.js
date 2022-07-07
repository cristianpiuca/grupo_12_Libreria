const path = require('path')
const fs = require('fs')
/* const products = require('../data/products') */

//database
const db = require('../database/models')
const {Op} = require('sequelize')
module.exports = {
    index :(req,res) => {
     db.Product.findAll(
       { include : ['images']}
      )
        .then(products => {
            return res.render('index', {
               products,
                user: req.session.userLogin
            })
        })
        .catch(error => console.log(error))
        /* return res.render('index', {
            products, 
            user: req.session.userLogin
        }) */
    },
   
    login :(req, res    ) => res.render('login'),
    register :(req, res) => res.render('register'),
    
    search: (req, res) => {

		const {keyword} = req.query;

		db.Product.findAll({
			where : {
				[Op.or] : [
					{
						title : {
							[Op.substring] : keyword
						}
					},
					{
						description : {
							[Op.substring] : keyword
						}
					}
				]
			},
			include : ['images']
		}).then(products => {
			return res.render('result',{
				products,
				keyword,
				
			})
		}).catch(error => console.log(error))
	},
    profile: (req, res) => {
        const { id} = req.params;

        const user = users.find(user => user.id === +id)
        console.log(user)

        return res.render('profile', {
            user
        })
        
      }
}