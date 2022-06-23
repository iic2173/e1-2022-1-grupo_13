'use strict';
const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

module.exports = {
  async up (queryInterface, Sequelize) {
    const usersArray = [];

    usersArray.push({
      email: 'jerry@example.com',
      nickname: 'Jerry',
      phone_num: 56990909090,
      telegram_user: '@Jerry_example',
      password: bcrypt.hashSync('Password123', PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      email: 'katty@example.com',
      nickname: 'Katty',
      telegram_user: '@Katty_Olguin',
      password: bcrypt.hashSync('Password123', PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      email: "drstrange@example.com",
      phone_num: 56980808090,
      nickname: "Dr Stephen Strange",
      telegram_user: "@Its_Strange",
      password: bcrypt.hashSync("Sorcerer1", PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    usersArray.push({
      email: "spector@example.com",
      phone_num: 56980808080,
      nickname: "Marc Spector",
      telegram_user: "@Moon_Knight",
      password: bcrypt.hashSync("Mercenary3", PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    usersArray.push({
      email: "wmaximoff@example.com",
      phone_num: 56980808010,
      nickname: "Wanda Maximoff",
      telegram_user: "@MissMaximoff",
      password: bcrypt.hashSync("ScarletWitch1", PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return queryInterface.bulkInsert('users', usersArray);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

// {
//   "email": "drstrange@example.com",
//   "phone_num": 56980808090,
//   "nickname": "Dr Stephen Strange",
//   "telegram_user": "@Its_Strange",
//   "password": "sorcerer"
// }

// {
//   "email": "spector@example.com",
//   "phone_num": 56980808080,
//   "nickname": "Marc Spector",
//   "telegram_user": "@Moon_Knight",
//   "password": "mercenary"
// }

// {
//   "email": "wmaximoff@example.com",
//   "phone_num": 56980808010,
//   "nickname": "Wanda Maximoff",
//   "telegram_user": "@MissMaximoff",
//   "password": "scarletwitch"
// }

// {
//   "email": "vis@example.com",
//   "phone_num": 5610101010,
//   "nickname": "Vision",
//   "telegram_user": "@SonofStark",
//   "password": "thevision"
// }