const path = require('path')
const fs = require('fs')
const db = require('../database/models')
const {Op} = require('sequelize')
module.exports = {
    index :(req,res) => {
    let destacados = db.Product.findAll(
       { 
		//parameters
		where : {
			stars: {
				[db.Sequelize.Op.gte] : 5
			}
		},
        include : ['images'],
		//images has a table on database
        order : [['id','ASC']],
		limit : 7,
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
         limit : 8,
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
   
    search: (req, res) => {

		const {keyword} = req.query;

		db.Product.findAll({
			where : {
				//parameters
				[Op.or] : [
					{
						title : {
							[Op.substring] : keyword
						}
					},
					{
						author : {
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
				user: req.session.userLogin
				
			})
		}).catch(error => console.log(error))
	},
	about : (req,res)=>{
		return res.render('aboutUs')
	},
	contact: (req,res)=>{
		return res.render('contactUs')
	}
}