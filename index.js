const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database").dbconnect();
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const PORT =  process.env.PORT||4000;
app.use(express.json());
const user = require("./routes/user");
app.use("/api/v1",user);
app.listen(PORT,()=>{console.log(`app is listening ${PORT}`)});