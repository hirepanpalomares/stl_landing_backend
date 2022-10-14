const { generateConfirmationCode } = require('../config/config.auth');
const { sendConfirmationMail } = require('../mail/confirmationEmail');

// const pool = require('../libs/postgress.pool')
// const sequelize = require('../libs/sequelize') // Runs pool strategy behind scenes
const { models } = require('./../libs/sequelize');
const {doRequest, verifySite} = require('../utilities/verify_site');



class InterestService {

  constructor() { }

  async generate() {  }

  async find(){
    // const query = "SELECT * FROM peopleinterested";
    // const [data, metadata] = await sequelize.query(query);
    const rta = await models.InterestedUser.findAll();
    return rta;
  }

  async create(body) {

    const { email, token, fullName, address } = body
    delete body.token

    // ---- validation with recaptcha ------------------
    const siteVerified = await verifySite(token);
    console.log("Varify robot: ", siteVerified);
    console.log(typeof siteVerified);
    if (!siteVerified.success){
      return "Bot"
    }
    // --------------------------------------------------


    const confirmationCode = generateConfirmationCode();
    const data = {
      ...body,
      confirmationCode: confirmationCode,
      verifiedStatus: false
    }

    const newUser  = await models.InterestedUser.create(data);

    sendConfirmationMail(confirmationCode, email, fullName, address);

    return newUser;
  }


  async validateEmail(confirmationCode) {

    const user = await models.InterestedUser.findOne({
      where: {
        confirmationCode: confirmationCode
      }
    });
    console.log(user);
    const { id } = user;
    const userUpdated = {
      country: user.country,
      zipCode: user.zipCode,
      droneWeight: user.droneWeight,
      isUserPropertyOwner: user.isUserPropertyOwner,
      email: user.email,
      verifiedStatus: true,
      confirmationCode: user.confirmationCode,
    }
    console.log(userUpdated);
    const confirmedUser = await models.InterestedUser.update(
      {
        verifiedStatus: true,
      },
      {
        where: { confirmationCode: confirmationCode },
      }
    )
    return confirmedUser;
  }
}

module.exports = InterestService;
