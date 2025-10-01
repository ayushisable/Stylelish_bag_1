const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedln");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');


router.get("/",function(req,res) {
    let error = req.flash("error");
    res.render("index",{error,loggedin:false});
});


   router.get("/delete/:productid", async function(req, res) {
  try {
    const productid = req.params.productid;
    await productModel.findByIdAndDelete(productid);
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
});





router.get("/shop",isloggedin, async function(req,res){
   let products = await productModel.find();
   let success = req.flash("success");
    res.render("shop",{products, success});
})

router.get("/addtocart/:productid", isloggedin,async function (req,res) {
   //const productid = req.params.productid;
   let user = await userModel.findOne({email:req.user.email}) ;
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success","Added to cart");
   res.redirect("/shop");
  
})

router.get("/cart",isloggedin,async function (req,res){
   let user = await userModel.findOne({email: req.user.email})
   .populate("cart");

    res.render("cart",{user})
})

router.get("/logout",isloggedin,async function(req,res){
   let user  = await userModel.findOne({email: req.user.email})
    res.render("shop");
})

router .get("/myaccount",isloggedin,async function(req,res){
   let user= await userModel.findOne({email:req.user.email})
   res.render("myaccount",{user});
})

module.exports = router;
