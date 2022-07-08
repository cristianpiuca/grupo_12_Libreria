const {
  validationResult
} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require ('../database/models');
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
              rolId: 2,
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
      .then((user)=> {
          req.session.userLogin = {
              id : +user.id,
              name: user.name,
              image: user.image,
              rolId : user.rolId
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
  profile: (req, res) => {
      db.User.findByPk(req.session.userLogin.id) 
      
      .then((user) => res.render("profile", {
          user : user,
        }))
        .catch (error => console.log(error)) 

  },
  edit : (req, res) => {
    db.User.findByPk(req.session.userLogin.id) 
      
      .then(() => res.render("profileEdit", {
          user :req.session.userLogin,
        }))
        .catch (error => console.log(error)) 
},

/* 
        IMPORTANTE : 

      ----  Error al actualizar el perfil de usuario múltiples veces -----

      al momento de actualizar los datos, todo funciona con normalidad y se actualiza el user en la db

      pero si en la misma sesión quiero editar nuevamente el usuario, al mandar el formulario me devuelve un 404

      Llevo dos dias tratando de solucionarlo pero no pude. La única manera de que funcione es bajar la sesión y volver a levantarla
      
      No me puedo guiar con proyectos ajenos ya que mi compañero armó la vista de edicion separada de la de perfil, entonces traté

      de unir ambos archivos en uno solo y que se acceda a los datos a la vez que se puedan editar pero no actualizaba en la db



*/
  update: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      if(req.session.userLogin.image&&req.file&&req.session.userLogin.image!="noimage.jpeg"){
        fs.unlinkSync(
            path.resolve(__dirname,"..", "..", "public", "images",req.session.userLogin.image)
         )
    }
    let { name, lastname,birth,address,state,phone } = req.body;
    db.User.findByPk(req.session.userLogin.id)
      .then(() => {
        db.User.update(
          {
            name: name.trim(),
            lastname: lastname.trim(),
              birth,
              address,
              state,
              phone,
            image: req.file && req.file.filename || "noimage.jpeg",
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
        user: req.body,
        errors: errors.mapped(),
      });
    }
  },
  logout: (req, res) => {
      req.session.destroy();
      res.cookie('boulevardCookie', null, {
          maxAge: -1
      });
      res.redirect('/')
  }

}