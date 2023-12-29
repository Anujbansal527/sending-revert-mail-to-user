const mongoose = require("mongoose");

//importing nodemailer
const nodemailer = require("nodemailer");

//importing mail sender config
const mailSending = require("../Config/mailConfig");

//defining schema
const mailSchema = new mongoose.Schema ({
    name:
        {
            required:true,
            type:String
        },
    email:
        {
            type:String
        },
    subject:
        {
            type:String
        },
    body:
        {
            type:String
        },
    file:
        {
            type:String
        },
});


//post middleware  
mailSchema.post("save", async function (doc) {
    try {
        console.log(" document" + doc);
        //creating transporter
        let transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        });
    
        //send mail
        let info = await transporter.sendMail({
          from: "anujbansal527@gmail.com",
          to: doc.email,
          subject: "thankyou for connecting",
          html: "<h2>THIS IS AUTO GENRETED MAIL</h2>",
        });
    
        console.log(info +" "+doc.email);
      } catch (error) {
        console.log(error);
      }
    });

const Mail = mongoose.model("Mail",mailSchema);
module.exports = Mail;