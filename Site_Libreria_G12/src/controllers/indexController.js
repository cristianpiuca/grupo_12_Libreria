const path = require('path')
const fs = require('fs')
/* const products = require('../data/products') */

//database
const db = require('../database/models')
const {Op} = require('sequelize')
module.exports = {
    index :(req,res) => {
    let destacados = db.Product.findAll(
       { 
		where : {
			stars: {
				[db.Sequelize.Op.gte] : 5
			}
		},
        include : ['images'],
        order : [['id','DESC']],
    }
      )
    let oferta = db.Product.findAll(
        { 
			where : {
				discount : {
					[Op.gte] : 10
				}
			},
         include : ['images'],
         limit : 12,
         order : [['id','DESC']],
     }
       )
       Promise.all([destacados,oferta])
			.then(([destacados,oferta]) => {
				return res.render('index',{
					destacados,
					oferta,
                    user: req.session.userLogin
				})
			})
			.catch(error => console.log(error))
       
       
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
        db.User.findByPk(req.session.userLogin.id) 
        
        .then((user) => res.render("profile", {
            user : user,
          }))
          .catch (error => console.log(error)) 
  
    },
}