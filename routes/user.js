const express= require("express");
const router = express.Router();
const {login,signup}= require("../controllers/auth");
const {auth,isStudent,isAdmin} = require("../middlewares/auths");
router.post("/login",login);
router.post("/signup",signup);
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for students"
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for admin"
    })})
    router.get("/test",auth,(req,res)=>{
        res.json({
            success:true,
            message:"welcome to the protected route for tests"
        })})
module.exports = router;