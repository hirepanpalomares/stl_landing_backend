const { Model, DataTypes, Sequelize } = require('sequelize');

const INTERESTED_USER_TABLE = 'interested_users';

const InterestedUserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  confirmationCode: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  email: {
    allowNull:false,
    type: DataTypes.STRING,
    unique: true
  },
  fullName: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  address: {
    allowNull:false,
    type: DataTypes.STRING,
    unique: false
  },
  verifiedStatus: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}


class InterestedUser extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INTERESTED_USER_TABLE,
      modelName: 'InterestedUser',
      timestamps: false
    }
  }
}

module.exports = { INTERESTED_USER_TABLE, InterestedUserSchema, InterestedUser}
