'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ping);
      this.hasMany(models.position);
    }

    async checkpassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  user.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 20],
      }
    },
    phone_num: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    telegram_user: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        contains: '@',
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      }
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeSave(async (instance) => {
    if(instance.changed('password')) {
      const hash = await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
      instance.set('password', hash);
    }
  });

  return user;
};