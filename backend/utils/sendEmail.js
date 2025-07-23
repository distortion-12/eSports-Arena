// File: utils/sendEmail.js

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env
      pass: process.env.EMAIL_PASS, // Your 16-character App Password from .env
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"eSports Arena" <${process.env.EMAIL_USER}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    html: options.html, // html body
  };

  // 3. Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;