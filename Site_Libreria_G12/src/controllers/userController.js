const {
  validationResult
} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require ('../database/models');
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

       // levanto session
          if (req.body.remember) {
              res.cookie('boulevardCookie', req.session.userLogin, {
                  maxAge: 1000 * 60 * 2
              })
          }
          res.redirect('/') 
      }).catch (error => console.log(error)) 
      } else {
          res.render('login', {
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
    res.render('profileEdit',{
        user : req.session.userLogin.id,
      }
    )
},
  update: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      let { name, lastname,birth,address,state,phone } = req.body;
      db.User.findByPk(req.session.userLogin.id)
        .then((user) => {
          db.User.update(
            {
              name: name.trim(),
              lastname: lastname.trim(),
              password: password
                ? bcryptjs.hashSync(password, 10)
                : user.password,
                birth,
                address : address.trim(),
                state: state.trim(),
                phone: +phone,
              image: req.file && req.file.filename,
            },
            {
              where: {
                id: req.session.userLogin.id,
              },
            }
          )
        
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("profile", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  logout: (req, res) => {
      req.session.destroy();
      res.cookie('userAprhodite', null, {
          maxAge: -1
      });
      res.redirect('/')
  }

}