const express = require("express");
const app = express();

//adding dotenv config
require("dotenv").config();

//adding port from dotenv file
const PORT = process.env.PORT || 4000 ;

//using json decoding middileware
app.use(express.json());

//middile ware for file uploading
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir:"/temp/"
}));

//connecting to cloud fileuploading
const cloud = require("./Config/Cloudinary2");
cloud.cloudinaryConnect();

//connecting to database
const dbConnect = require("./Config/database");
dbConnect();

//adding api routes
const mailSending = require("./Router/mailSending");
app.use("/api/v1/mailSend",mailSending);


//creating server
app.listen(PORT, ()=>{
    console.log(`server start at ${PORT}`);
})

//default route 
app.get("/",(req,res) =>
{
    res.send("This is default page");
});