const express = require('express');
const router = express.Router();
const Product = require('../modules/product');
const Review = require('../modules/review');
const {isLogged} = require('../middleWare');


try{
//home route
router.get('/home',isLogged,async(req,res)=>{
    try{
        const products = await Product.find({});
    res.render('home',{products});
}
catch(e){
    req.flash('error','oops something went wrong....');
    res.redirect('/error');
}
    
});

//new route
router.get('/home/new',isLogged,(req,res)=>{
    res.render('product/new');
})
router.post('/home',async(req,res)=>{
    try{
        const {name,img,desc} = req.body;
        await Product.create({name,img,desc});
       
        req.flash('success','Product created successfully');
        res.redirect('/home');
    }
    catch(e){
        req.flash('error',"Something went wrong, Cant't add new product.")
        res.redirect('/error');
    }
})

// show route
router.get('/home/:id',isLogged,async(req,res)=>{
    try{
        const {id}=req.params;
        const reqProduct = await Product.findById(id).populate('reviews');
        // console.log(reqProduct.id);
        res.render('product/show',{reqProduct});
    }
    catch(e){
        req.flash('error','Something went wrong');
        res.redirect('/error');
    }
    
    
});




// edit route

router.get('/home/:id/edit',isLogged,async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.render('product/edit',{product});
    }
    catch(e){
        req.flash('error','Something went wrong');
        res.redirect('/error');
    }
});

router.patch('/home/:id/edit',isLogged,async(req,res)=>{
    try{
        const {id} = req.params;
        const updatedCont = req.body;
        const product = await Product.findById(id);
        await Product.findByIdAndUpdate(id,updatedCont);
        req.flash('success',`Your product ${product.name} is successfully edited`);
        res.redirect('/home');
        // console.log(updatedCont);
    }
    catch(e){
        req.flash('error','Something went wrong');
        res.redirect('/error');
    }
})

// delete route
router.delete('/home/:id',isLogged,async(req,res)=>{
    try{
        const {id} = req.params;
       await Product.findByIdAndDelete(id);
       req.flash('success','Successfully deleted');
        res.redirect('/home');
    }
    catch(e){
        req.flash('error','Something went wrong');
        res.redirect('/error');
    }
})

// review route

router.post('/home/:id/review',isLogged,async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        const {rating,comment} = req.body;
        const review = new Review({rating,comment});

        product.reviews.push(review);

        await product.save();
        await review.save();

        req.flash('success','Successfully created review!!');
        res.redirect(`/home/${id}`);

    }
    catch(e){
        req.flash('error','Something went wrong');
        res.redirect('/error');
    }
})
}
catch(e){

    req.flash('error','Something went wrong');
    res.redirect('/error');
}
module.exports = router;