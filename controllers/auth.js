const bcrypt = require("bcrypt");
const user=require("../models/usermodel");
exports.signup = async(req,res)=>{
    try{
             const {name,email,password,role}= req.body;
             const existing = await user.findOne({email})
             if(existing)
             {
                return res.status(400).json({
                    success:false,
                    messeage:"user already exist",
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