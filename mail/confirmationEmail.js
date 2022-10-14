const transporter = require("./transporter");


async function sendConfirmationMail(confirmationCode, email, fullName, address) {


  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    from: process.env.EMAIL_ORIGIN_USER,
    // to: "bar@example.com, baz@example.com", // list of receivers
    to: email,
    subject: "Este es un nuevo correo", // Subject line
    text: "Hola hirepan", // plain text body
    html: `
      <h1> Hi ${fullName}! <h1/>

      <p>
      Thank you for registering with Sky Trade Links.
      We are delighted to welcome you to the community.
      As you can understand we need to confirm you are the property
      owner of "${address}" and able to receive the passive income from
      the airspace above your property.
      </p>

      <p>
      It's a very simple step so won't take long. We don't want anyone else
      to get what you'r entitled to so we keep everything secure.
      To prevent the secure link we will be sending you from going into
      the promotions folder please reply 'Hello' to the email.
      It just tells your email provider that the link should go to your inbox.
      Also please click in the link to <a href=http://localhost:3000/confirm/${confirmationCode}> confirm your email <a/>.
      Thank you for being part of Sky Trade Links and we look forward to helping
      you grow your income in a passive way.

      </p>

      Jonathan

    `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = { sendConfirmationMail };
