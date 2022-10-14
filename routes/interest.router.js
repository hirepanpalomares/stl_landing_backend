const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-encode');

const InterestService = require('../services/interest.service')

const router = express.Router();
const service = new InterestService();



router.get('/',  async (req, res) => {
  const interestUsers = await service.find();
  res.status(200).json(interestUsers)
})


router.patch('/confirm',  async (req, res, next) => {
  try {
    const { confirmationCode } = req.body
    console.log("-------------------------------");
    console.log(confirmationCode);
    const confirmedUser = await service.validateEmail(confirmationCode);
    res.json(confirmedUser)
  } catch (error) {
    next(error);
  }
})


router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newInterest = await service.create(body);
    res.status(201).json(newInterest);
  } catch (error) {
    next(error);
  }

})


module.exports = router;
