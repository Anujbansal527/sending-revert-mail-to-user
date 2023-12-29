const nodemailer = require("nodemailer");

//operation or function //function contain doc that getting while posting
exports.MailSend = () =>
 {
    mailSchema.post("create", async function (doc) {
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
    let info = await transporter.send({
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
}

