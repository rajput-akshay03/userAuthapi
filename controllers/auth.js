const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const user=require("../models/usermodel");
require("dotenv").config();
exports.signup = async(req,res)=>{
    try{
             const {name,email,password,role}= req.body;
             const existing = await user.findOne({email})
             if(existing)
             {
                return res.status(400).json({
                    success:false,
                    messeage:"user already exists",
                });
             }
             let hashpassword;
             try{
                hashpassword =await bcrypt.hash(password,10);   // argument main jisko hash krna h aur no. of rounds 
             }
             catch(err)
             {
                console.log(err)
                return res.status(400).json({
                    success:false,
                    message:"error in hashing the password",
                })
             }
             const newuser = user.create({name,email,password:hashpassword,role})
             return res.status(200).json(
                {
                    success:true,
                    message:"user created suucessfully",
                }
             )
    }
    catch(err)
    {    console.log(err);
         res.status(400).json(
         {
             success:false,
             message:"error in creating user",
         })
    }
}
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password)
        {
            return res.json({
                success:false,
                message:"please fill datails"
            })
        }
        let loginuser = await user.findOne({email});
        if(!loginuser)
        {
            return res.json({
                success:false,
                message:"no user found"
            })
        } 
        const payload = {
            email:loginuser.email,
            id:loginuser._id,
            role:loginuser.role,
        }
        if(await bcrypt.compare(password,loginuser.password))
        {
           let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
           loginuser = loginuser.toObject();
        // loginuser= loginuser.toObject();
           loginuser.token = token; 
           loginuser.password = undefined;
           const options = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
           } 
           res.cookie("new cookie",token,options).status(200).json(
            {
                success:true,
                token,
                loginuser,
                message:"loggedin successfully"
            }
           )
        }
        else{
            return res.json({
                success:false,
                message:"password incorrect"
            })
        }
    }
    catch(err)
    {
         console.log(err)
         return res.status(400).json({
            success:false,
            message:"error in logging",
         })
    }
      

}