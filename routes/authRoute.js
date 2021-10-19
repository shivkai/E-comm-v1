const express = require('express');
const router = express.Router();
const User = require('../modules/user');
const passport = require('passport');


// signup route
router.get('/signup',(req, res)=>{
    res.render('auth/signup');
});

router.post('/signup',async(req, res)=>{
    const {username,email,password,category} = req.body;
    // const fff = req.body;
// console.log(fff);
// res.redirect('/signup');

    const user = new User({
        username:username,
        email:email,
        category:category
    });
     
    await User.register(user,password);

      req.flash('success',`Please login again dear ${username}`);
      res.redirect('/login');
});

// login route

router.get('/login',(req,res)=>{
    res.render('auth/login');
});

router.post('/login',
    passport.authenticate('local',
    {
        failureRedirect:'/login',
        failureFlash:true
    }),
    (req,res)=>{
        const {username} = req.user;
        console.log(req.user);
        req.flash('success',`Welcome back master ${username}`);
        res.redirect('/home');
    });

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','Successfully logged out!!');
    res.redirect('/login');
});

module.exports = router;