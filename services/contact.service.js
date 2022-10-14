const faker = require('faker');
const boom = require('@hapi/boom');

var jwt = require("jwt-encode");

// const { models } = require('./../libs/sequelize');
const { sendInvestorsContactMail } = require('../mail/investorsEmail');
const { verifySite } = require('../utilities/verify_site');
const { sendContactMail } = require('../mail/contactEmail');


class ContactService {

  constructor() {
  }




  async sendContactMessage(body) {

    // TODO Implement getting the files
    // const { email, name, message, files } = body;
    const { email, name, message, token } = body;

    // ---- validation with recaptcha ------------------
    const siteVerified = await verifySite(token);
    console.log("Varify robot: ", siteVerified);
    console.log(typeof siteVerified);
    if (!siteVerified.success){
      return "Bot"
    }
    // -------------------------------------------------

    sendContactMail(email, name, message);

    return "message sent";
  }

  async investorsContact(body) {

    // TODO Implement getting the files
    // const { email, name, message, files } = body;

    const { email, name, company, companyPosition, investmentSize, token } = body;

    // ---- validation with recaptcha ------------------
    const siteVerified = await verifySite(token);
    console.log("Varify robot: ", siteVerified);
    console.log(typeof siteVerified);
    if (!siteVerified.success){
      return "Bot"
    }
    // -------------------------------------------------

    sendInvestorsContactMail(email, name, company, companyPosition, investmentSize);

    return "message sent";
  }

}

module.exports = ContactService;
