const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const usuarios = require('../data/users.json');

module.exports = {
    register : (req, res) => res.render('register'),
    processRegister : (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let {name, email, password} = req.body
            let lastID = usuarios.length !== 0 ? usuarios[usuarios.length - 1].id : 0;
            let newUser = {
              id: +lastID + 1,
              name: name.trim(),
              email,
              password,
            };
            usuarios.push(newUser)
            fs.writeFileSync(
                path.resolve(__dirname, "..", "data", "users.json"),
                JSON.stringify(usuarios, null, 3),
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
    login : (req, res) => res.render('login'),
    password: (req, res) => res.render('password')
}