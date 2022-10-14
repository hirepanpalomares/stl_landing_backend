const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_ORIGIN_HOST,
  port: process.env.EMAIL_ORIGIN_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ORIGIN,
    pass: process.env.EMAIL_ORIGIN_PWD,
  },
});


module.exports = transporter
