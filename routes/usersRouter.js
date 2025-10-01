const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken"); 
const {registerUser} = require("../controllers/authController");
const {loginUser ,logout} = require("../controllers/authController");

router.get('/' ,( req,res)=>{
   res.send("hey this working");
});

router.post("/register", registerUser)

router.post("/login",loginUser);

router.get("/logout", logout);



module.exports = router;