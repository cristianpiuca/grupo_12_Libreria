module.exports = {
    index : (req, res) => res.render('index', { title: 'Express' }),
    login :(req, res) => res.render('login'),
    register :(req, res) => res.render('register')
}