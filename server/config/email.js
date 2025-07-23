const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail", // or use 'hotmail', 'Yahoo', or a custom SMTP service
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

module.exports = transporter;
