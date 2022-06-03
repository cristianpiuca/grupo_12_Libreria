module.exports = {
    register : (req, res) => res.render('register'),
    login : (req, res) => res.render('login'),
    password: (req, res) => res.render('password'),
    profile: (req, res) => res.render('profile'),
    profileEdit: (req,res) => res.render('profileEdit')
}