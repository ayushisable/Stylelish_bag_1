

const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken"); 



module.exports.registerUser =  async (req,res)=>{
    try {
        let {email,password,fullname} = req.body;
        let user = await userModel.findOne({email:email});
        if(user) 
            return res.status(401).send("you already have an account, please login");

        bcrypt.genSalt(10,function(err, salt){
          bcrypt.hash(password,salt,async function (err,hash) {
            if (err) return res.send(err.message);
            else{
            let user = await userModel.create({
                 email,
                 password: hash,
                 fullname
             });
              //jwt.sign({email,id:user._id},"heyhey");
              let token =generateToken(user);
              
              res.cookie("token",token);
              
              res.render("owner-login");

            }
          })
        })
       
       //res.send(user);
    } catch (error) {
         console.log(error.message);
    }}

module.exports.loginUser = async (req,res)=>{
    let{email,password} = req.body;

    let user =await userModel.findOne({email:email});
    if(!user) return res.send("email or password is wrong");

    bcrypt.compare(password,user.password,(err,result) =>{
       if(result){
        let token = generateToken(user);
        res.cookie("token",token);
        res.redirect("/shop")
       }
       else{
        res.send("email or password is wrong");
       }
    })
} 

module.exports.logout  = (req,res) =>{
    res.cookie("token","");
    res.redirect("/");
}