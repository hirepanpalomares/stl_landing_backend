const { models } = require('../libs/sequelize');


class VisitService {

  constructor() {
    this.generate();
  }

  generate() { }

  async findAll() {

    const visits = await models.Visits.findAll();
    return visits;

  }

  async create(body) {

    const newVisit  = await models.Visits.create(body);
    return newVisit;
  }

  async increase_counter(body) {

    const { unique_id } = body;

    const incrementVisit = await models.Visits.increment(
      {number_visits: 1}, {where: {unique_id: unique_id}}
    );

    return incrementVisit;
  }

}

module.exports = VisitService;
