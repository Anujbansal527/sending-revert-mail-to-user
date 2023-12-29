const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    try 
    { 
        mongoose.connect(process.env.DATABASE_URL , { })
    .then(()=>{console.log("MongoDB Connected ...")})
    .catch((error) => { console.log(`Error occured ${error}`)})
    }
    catch(error)
    {
        console.log(`error ${error}`);
    }
}
module.exports = dbConnect;