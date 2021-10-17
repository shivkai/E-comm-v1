
const isLogged = (req,res,next)=>{
    if(!req.isAuthenticated())
    {
        req.flash('error','You have to login first to use our service');
        res.redirect('/login');
    }
    next();
}

module.exports = {isLogged};