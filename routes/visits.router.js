const express = require('express');

const VisitService = require('../services/visits.service')

const router = express.Router();
const service = new VisitService();



router.get('/', (req, res) => {
  const visits = service.findAll();
  res.status(200).json(visits);
})


router.post('/', async (req, res, next) => {
  try {
    // console.log(req);
    const body = req.body;
    const newVisit = await service.create(body);
    res.status(201).json(newVisit);
  } catch (error) {
    next(error);
  }

})

router.patch('/', async (req, res, next) => {

  try {
    const increasedVisit = await service.increase_counter(req.body)
    res.status(202).json(increasedVisit);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
