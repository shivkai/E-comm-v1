const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./modules/product');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./modules/user');

if(process.env.NODE_ENV !=='production')
{
    require('dotenv').config();
}

mongoose.connect(process.env.DB_ADD)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
// seedDB();

const sessionConfig ={
    secret: 'topsecret',
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

const productRoutes = require('./routes/productRoutes');
const authRoute = require('./routes/authRoute');
const cartRoute = require('./routes/cartRoute');

app.get('/',(req,res)=>{
    res.render('landing');
});
// app.get('/landing',(req,res)=>{
//     res.render('landing');
// });
app.get('/error',(req,res)=>{
    res.render('error');
});



app.use(productRoutes);
app.use(authRoute);
app.use(cartRoute);
//listen route
const port = process.env.PORT||2323;
app.listen(port,()=>{
    console.log(`Fired at ${port}`);
})