const {
  validationResult
} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require ('../database/models');
// for images
const fs = require('fs')
const path = require('path')

module.exports = {
  register: (req, res) => {
      res.render('register')
  },
  processRegister: (req, res) => {
      let errors = validationResult(req)

      if (errors.isEmpty()) {
          let {
              name,
              lastname,
              email,
              password,
          
          } = req.body
          db.User.create ({
              name: name.trim(),
              lastname: lastname.trim(),
              email: email.trim(),
              password: bcryptjs.hashSync(password, 10),
              image: 'noimage.jpeg',
              rolId: 2, //default
          })
          .then( () => {
            
              return res.redirect("/")})
              .catch (error => console.log(error)) 

      } else {

          return res.render('register', {
              old: req.body,
              errors: errors.mapped()
          });
      }
  },
  login: (req, res) => {
      res.render('login')
  },
  loginUser: (req, res) => {

    /* 
    ------  Para acceder como administrador ----

      usuario : noeliaromina20@gmail.com
      contraseña: 123456
    
    */
      const errors = validationResult(req); 

      if (errors.isEmpty()) {
       
      db.User.findOne({
          where: {
              email: req.body.email
          }
      })
      .then(async({id,name,image,rolId})=> {
       let order = await db.Order.findOne({
          where : {
            userId  : id,
            /* se llama userId enel modelo de order */
            statusId : 1 
            /* perteneciente al seeder de status, 1 'en proceso' */
          },
          include : [{
            association : 'carts',/* order con carrito */
            include : [
              {
                association : 'products',/* producto dentro del carrito */
                include : ['images']
              }
            ]
          }]
          
        })
          req.session.userLogin = {
              id : +id,
              name,
              image,
              rolId : +rolId,
              order
          }

       
         /*  if (req.body.checkbox) {
              res.cookie('boulevardCookie', req.session.userLogin, {
                  maxAge: 1000 * 60 * 2
              })
          } */
          res.redirect('/') 
      }).catch (error => console.log(error)) 
      } else {
          res.render('login', {
            old: req.body,
              errors: errors.mapped()
          })

      }

  },
  //into user data
  profile: (req, res) => {
   
      db.User.findByPk(req.session.userLogin.id) 
      
      .then((user) => res.render("profile", {
          user : user,
        }))
        .catch (error => console.log(error)) 

  },
  //into edit form
  edit : (req, res) => {
    db.User.findByPk(req.session.userLogin.id) 
      
      .then(() => res.render("profileEdit", {
          user :req.session.userLogin,
        }))
        .catch (error => console.log(error)) 
},


//update profile for user
  update: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      if(req.file){
        if(fs.existsSync(path.join(__dirname, "../../public/images",req.session.userLogin.image)) &&
          req.session.userLogin.image !== "noimage.jpeg"){
            fs.unlinkSync(path.join(__dirname, "../../public/images",req.session.userLogin.image))
          }
      }
     
    let { name, lastname,birth,address,state,phone } = req.body;
    db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        db.User.update(
          {
            name: name.trim(),
            lastname: lastname.trim(),
              birth,
              address,
              state,
              phone,
            image: req.file && req.file.filename || user.image,
          },
          {
            where : {
              id : req.session.userLogin.id
            }
          }
          
        )
        
       return res.redirect('/')
       
      }
      )
      .catch(error => console.log(error))
     
    } else {
      return res.render("profileEdit", {
        user: req.body, //user using locals.user because didn´t show errors 
        errors: errors.mapped(),
      });
    }
  },
  logout: (req, res) => {
    //this is working
      req.session.destroy();
      res.cookie('boulevardCookie', null, {
          maxAge: -1
      });
      res.redirect('/')
  },
  admin : (req,res) => {
   let products = db.Product.findAll(
      { 
          order : [['id','DESC']],
           include : ['images']
          }
     )
    let users = db.User.findAll()
  
    Promise.all([products, users])
    .then(([products, users]) => {
           return res.render('admin', {
              products,
              users,
               user: req.session.userLogin
           })
       })
       .catch(error => console.log(error)) 
   
  },

  userRol:async(req,res)=>{
    try {

        let {rolId} = await db.User.findByPk(req.params.id)

       if(rolId=== 1){
        await db.User.update( {
          rolId: 2
        }, {
          where :{ 
            id:req.params.id
          }
        }
        )

       }else{
        await db.User.update( {rolId: 1}, {
          where :{ 
            id:req.params.id
          }
        }
        )
       }
     
       return res.redirect('/users/admin');
    } catch (error) {
     
        console.log(error);
    }
  },
  remove: (req, res) => {
    db.User.destroy({
            where: {
              id : req.session.userLogin.id
            }
        })
        .then((info) => {
          req.session.destroy();
          res.cookie('boulevardCookie', null, {
              maxAge: -1
          });
          res.redirect('/')
        })
        .catch(error => console.log(error))
       
}

}