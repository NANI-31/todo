const transporter = require("../config/email");
const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "email-template.html");
let emailTemplate = fs.readFileSync(templatePath, "utf8");
const sendVerificationEmail = async (user, verificationToken) => {
  const verificationLink = `http://yourdomain.com/verify?token=${verificationToken}`;
  const htmlContent = emailTemplate
    .replace(/{{USER_NAME}}/g, user.name)
    .replace(/{{USER_EMAIL}}/g, user.email)
    .replace(/{{VERIFICATION_LINK}}/g, user.verificationLink);
  const mailOptions = {
    from: '"Your App Name" <your-email@example.com>',
    to: user.email,
    subject: "Email Verification",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendVerificationEmail = sendVerificationEmail;
