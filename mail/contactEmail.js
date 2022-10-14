const transporter = require("./transporter");
const nodemailer = require('nodemailer');



async function sendContactMail(email, name, message) {

  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    from: process.env.EMAIL_ORIGIN,
    // to: "bar@example.com, baz@example.com", // list of receivers
    to: process.env.EMAIL_DESTINATION,
    subject: "New contact from SkyTradeLinks website", // Subject line
    text: `Message from ${name}, email:${email}`, // plain text body
    html: `
      <h3> New message from ${name}, email:${email} <h3/>
      <p>
        ${message}
      </p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { sendContactMail };
