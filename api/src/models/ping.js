'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.user);
    }
  }
  ping.init({
    // userId: DataTypes.INTEGER,
    // reciverId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    reciverId: DataTypes.STRING,
    status: DataTypes.INTEGER,
    sidi: DataTypes.DOUBLE,
    siin: DataTypes.DOUBLE,
    dindin: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'ping',
  });
  return ping;
};