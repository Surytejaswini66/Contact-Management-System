// utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

// In your registration controller
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;
  const subject = "Verify your email";
  const text = `Click the link to verify your email: ${verificationUrl}`;
  await sendEmail(email, subject, text);
};

// Call this function in your registration logic after creating the user
await sendVerificationEmail(user.email, verificationToken);
