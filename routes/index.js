const express = require('express');

const interestRouter = require('./interest.router');
const contactRouter = require('./contact.router');
const visitRouter = require('./visits.router');


function routerApi(app) {
  const router = express.Router();

  app.use('/api', router);

  router.use('/user', interestRouter);
  router.use('/contact', contactRouter);
  router.use('/visits', visitRouter);
}

module.exports = routerApi;
