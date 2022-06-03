module.exports = (req,res,next) => {
    if(req.session.userLogin){
        res.loals.userLogin = req.session.userLogin
    }
    next()
}