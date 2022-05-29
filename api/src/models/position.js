'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsToMany(models.tag, {
        through: 'position_tags',
      });
    }
  };
  position.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    geography: DataTypes.GEOMETRY('POINT', 4326)
  }, {
    sequelize,
    modelName: 'position',
  });
  return position;
};