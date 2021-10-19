const User = require('../modules/user');
const express = require('express');
const router = express.Router();
const Product = require('../modules/product');
const {isLogged} = require('../middleWare');


// router.get('/user/cart',isLogged,async(req,res)=>{
// res.send('THESE IS CART');
// console.log(req.user);
    // const userId = req.user._id;
    // const user = await User.findById(userId).populate('cart');
    // res.render('cart/userCart',{user});
// })
router.get('/landing',(req,res)=>{
    res.render('landing');
})

router.post('/cart/:productid/add',isLogged,async(req, res) => {
    
    const { productid } = req.params;
   
    const product = await Product.findById(productid);

    const currentUser = req.user;

    currentUser.cart.push(product);

    await currentUser.save();

    req.flash('success', 'Item added to your cart successfully');
    res.redirect(`/home/${productid}`);
});

router.get('/user/cart',isLogged,async(req,res)=>{
    console.log(req.user._id);
    const userId = req.user._id;
    const user = await User.findById(userId).populate('cart');
    res.render('cart/userCart',{user});
});
// router.get('/cart/add',(req,res)=>{
//     // const {id} = req.params;
//     res.send('hello');
// });
// router.post('/cart/:id/add',async(req,res)=>{
//     const {id} = req.params;
//     console.log(id);
//     const product = await Product.findById(id);
//     const currUser = req.user;

//     currUser.cart.push(product);
//     await currUser.save();

//     req.flash('success','Item added to your cart');
//     res.redirect(`/home/${id}`);
// });

router.delete('/cart/:id/remove',isLogged,async(req,res)=>{
    const productId = req.params.id;
    const userId = req.user._id;
   await User.findByIdAndUpdate(userId,{$pull:{cart:productId}});
    res.redirect('/user/cart');
});

module.exports = router;