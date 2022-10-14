const { InterestedUser, InterestedUserSchema } = require('./interested_user.model');
// const { Visits, VisitsSchema } = require('./visitCounter.model');


function setupModels(sequelize) {
  InterestedUser.init(InterestedUserSchema, InterestedUser.config(sequelize));
  // Visits.init(VisitsSchema, Visits.config(sequelize));
}

module.exports = setupModels;
