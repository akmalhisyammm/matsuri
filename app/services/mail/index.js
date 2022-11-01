const nodemailer = require('nodemailer');
const fs = require('fs');
const Mustache = require('mustache');
const { gmail, password } = require('../../config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    const template = fs.readFileSync('app/views/email/otp.html', 'utf8');

    const message = {
      from: gmail,
      to: email,
      subject: '[Matsuri] Registration OTP',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { otpMail };
