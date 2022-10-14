const transporter = require('./transporter');
const nodemailer = require('nodemailer');



async function sendInvestorsContactMail(email, name, company, companyPosition, investmentSize) {

  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    from: process.env.EMAIL_ORIGIN,
    // to: "bar@example.com, baz@example.com", // list of receivers
    to: process.env.EMAIL_DESTINATION,
    subject: "New investor contact from SkyTradeLinks website", // Subject line
    text: `An investor is trying to contact you, Info: `, // plain text body
    html: `
      <h3> An investor is trying to contact you, Info:  <h3/>
      <p>
        Name: ${name}
      </p>
      <p>
        Email: ${email}
      </p>
      <p>
        Company: ${company} - ${companyPosition}
      </p>
      <p>
        Investment size: ${investmentSize}
      </p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { sendInvestorsContactMail };
