const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET  = 'goodboi'
router.post('/createuser',[
    body('name', 'Name should atleast be 3 characters long').isLength({min:3}),
    body('email', 'Please enter valid email').isEmail(),
    body('password','Password too short').isLength({min:4}),
],async(req,res)=>{
    console.log(req.body);
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.send({errors:result.array()});
    }
    try {
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error: "Sorry this email is already registered"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user  = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        const data = {
            user:{
                id:user._id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        return res.json({authToken});
    }catch (error) {
        console.error(error.message);
        return res.status(500).send("Some error occured")
    }
    
});

module.exports = router;
