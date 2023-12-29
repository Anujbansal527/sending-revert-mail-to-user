const express=require("express");
const router = express.Router();

const { emailSender } = require("../Controller/emailSender");

router.post("/mailSending",emailSender);

module.exports = router;