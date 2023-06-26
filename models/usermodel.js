const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            trim:true,
        },
        user:{
            type:String,
            enum:["Admin","Student","Visitor"],
        }
    }
)
module.exports= mongoose.model("user",userSchema);