const { Model, DataTypes, Sequelize } = require('sequelize');

const VISITS_TABLE = 'visits';

const VisitsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  unique_id: {
    allowNull:false,
    type: DataTypes.STRING,
    unique: true
  },
  visitedFirstTimeAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'visited_first_time_at',
    defaultValue: Sequelize.NOW
  },
  browser: {
    allowNull: false,
    type: DataTypes.STRING
  },
  isMobile: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  number_visits: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}


class Visits extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VISITS_TABLE,
      modelName: 'Visits',
      timestamps: false
    }
  }
}

module.exports = { VISITS_TABLE, VisitsSchema, Visits}
