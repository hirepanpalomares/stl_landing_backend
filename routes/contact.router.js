const express = require('express');

const ContactService = require('../services/contact.service')

const router = express.Router();
const service = new ContactService();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
  const contactUsers = service.findAll();
  res.status(200).json(contactUsers);
})


router.post('/message', urlencodedParser, async (req, res) => {

  // console.log(req);
  const body = req.body;
  const newMessage = await service.sendContactMessage(body);
  res.status(201).json(newMessage);

})

router.post('/investors', urlencodedParser, async (req, res) => {
  // console.log(req);
  const body = req.body;
  const newMessage = await service.investorsContact(body);
  res.status(201).json(newMessage);

})


module.exports = router;
