const cookieSession = (req, res, next) => {
    if(req.cookies.boulevardCookie){
        req.session.userLogin = req.cookies.boulevardCookie;
        res.locals.userLogin = req.session.userLogin;
    }
    next()
}

module.exports = cookieSession