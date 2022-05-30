'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.position, {
        through: 'position_tags',
      });
    }
  }
  tag.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};