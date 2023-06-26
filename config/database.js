const mongoose = require("mongoose");
require("dotenv").config();
exports.dbconnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL
        ,{useNewUrlParser:true,
        useUnifiedTopology:true,}
        ).then(()=>{console.log("mongodb connected succesfully")}).
        catch((err)=>{console.log(err)
            process.exit(1)}
        )
       
}