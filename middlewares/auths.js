const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth=(req,res,next)=>{
    try{
        const token = req.body.token||req.cookie.token||req.header("Authorization").replace("bearer ","");
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"token missing",
            })
        }
        try{
            const decode =jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.loginuser = decode;
        
        }
        catch(err)
        {
            return res.status(401).json({
                success:false,
                message:"invalid token" 
             })
        }
        next();
    }
    catch(err)
    {
        return res.status(401).json({
            success:false,
            message:"something went wrong while verifying token" 
         })
    }
}
exports.isStudent=(req,res,next)=>{
      try{
            if (req.loginuser.role!="Student")
            {
                return res.status(401).json({
                    success:false,
                    message:"this is protected route for the students" 
                 })
            }
            next();
      }
      catch(err)
      {
        return res.status(401).json({
            success:false,
            message:"user role is not matching" 
         })
      }
}
exports.isAdmin=(req,res,next)=>{
    try{
          if (req.loginuser.role!="Admin")
          {
              return res.status(401).json({
                  success:false,
                  message:"this is protected route for the admin" 
               })
          }
          next();
    }
    catch(err)
    {
      return res.status(401).json({
          success:false,
          message:"user role is not matching" 
       })
    }
}