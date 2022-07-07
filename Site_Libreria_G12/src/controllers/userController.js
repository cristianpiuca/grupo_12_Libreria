const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const users = require('../data/users.json');
const db = require ('../database/models');

module.exports = {
  register: (req,res) => {
    res.render('register')
},

  processRegister: (req, res) => {
    let errors = validationResult(req)

    if (errors.isEmpty()) {
      let { name, email, password,lastname } = req.body
      db.User.create ({
        name: name.trim(),
        lastname : lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 10),
        rolId: 2,
      
    })
    .then( () => {
      if (req.body.checkbox) {
        const expireSession = 60000;
        res.cookie('boulevardCookie', req.session.userLogin, {
          expires: new Date(Date.now() + expireSession),
          httpOnly: true,
          secure: true
        })
      }
      res.locals.userLogin = req.session.userLogin
        return res.redirect("/")})

} else {

    return res.render('register', {
        old: req.body,
        errors: errors.mapped()
    });
}
  },
  password: (req, res) => res.render('password'),
  login: (req, res) => {
    res.render('login')
},
  loginUser: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
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
       
  
      res.redirect('/')
      })
      } else {
          res.render('login', {
              old: req.body,
              errors: errors.mapped()
          })

      }
    }
  },
  profile: (req, res) => {
    const { id } = req.params;
    let usuariosNuevos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','users.json')));
    const user = usuariosNuevos.find(user => user.id === +id)
   

    return res.render('profile', {
      user
    })

  },
  edit: (req, res) => {
    const { id } = req.params;

    const user = users.find(user => user.id === +id)
    return res.render('profileEdit',{
      user: req.session.userLogin,
      user

    })

  },
  update: (req,res) => {

    let errors = validationResult(req);
    if (errors.isEmpty()){
    const {id} = req.params;
    const {name, lastname, birth, email, direction, province, tel, } = req.body;
   
    const usersEdit = users.map(user =>{
      if(user.id === +id){
        let userEdit = {
          ...user,
          name,
          lastname, 
          birth,
          email,
          direction,
          province,
          tel,
          img: req.file ? req.file.filename : user.img
        }
        if (req.file) {
          console.log(user);
          console.log(req.file)
          if (fs.existsSync(path.resolve(__dirname, "..", "public", "images",req.file.filename)) && req.file !== "noimage.jpeg") {
              fs.unlinkSync(path.resolve(__dirname, "..", "public", "images", req.file.filename))
          }
      }
        
        return userEdit
      }
      return user
    })
    let usuariosViejos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','users.json')));
    
    
    fs.writeFileSync(path.resolve(__dirname, "..",'data','users.json'), JSON.stringify(usersEdit, null, 3), "utf-8")
    const userUpdate = users.find(user => user.email === req.body.email);
   

    req.session.userLogin = {
      id : userUpdate.id,
      name : userUpdate.name,
      email : userUpdate.email,
      birth : userUpdate.birth,
      lastname : userUpdate.lastname,
      direction : userUpdate.direction,
      province : userUpdate.province,
      tel : userUpdate.tel,
      rol : userUpdate.rol
    }
  
    return res.redirect('/users/profile/'+id)
  
  }else{
    return res.render('profileEdit',{
      user: req.session.userLogin,
      errors : errors.mapped()
    })
  }

    
  },

  logout: (req, res) => {
    req.session.destroy();
    if (req.cookies.boulevardCookie) {
      res.cookie('boulevardCookie', "", { maxAge: -1 })
    }
    res.redirect('/')
  }
}