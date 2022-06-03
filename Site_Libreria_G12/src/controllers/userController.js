const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const users = require('../data/users.json');

module.exports = {
    register : (req, res) => res.render('register'),
    processRegister : (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let {name, email, password} = req.body
            let lastID = users.length !== 0 ? users[users.length - 1].id : 0;
            let newUser = {
              id: +lastID + 1,
              name: name.trim(),
              email,
              password,
            };
            users.push(newUser)
            fs.writeFileSync(
                path.resolve(__dirname, "..", "data", "users.json"),
                JSON.stringify(users, null, 3),
                "utf-8"
              );
              return res.redirect("/");
        }else{
            return res.render("register",{
                old : req.body,
                errors : errors.mapped()
            });
        }
    },
    password: (req, res) => res.render('password'),
    login : (req, res) => res.render('login'),
    loginUser : (req,res) =>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {
    
          const {id, name} = users.find(user => user.email === req.body.email);
    
          req.session.userLogin = {
              id,
              name
          }
    
        
    
          return res.redirect("/");
    
        }else {
          return res.render("login",{
            errors : errors.mapped()
          });
    
        }
      },
      profile: (req, res) => res.render('profile'),
      profileEdit: (req,res) => res.render('profileEdit')
}