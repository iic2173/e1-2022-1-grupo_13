'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const pingsArray = [];

    pingsArray.push({
      userId: 'auth0|62b3ead84dd722e042fa16fe',
      reciverId: 'auth0|62b3dec43ef05cf3b8d8cf74',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    pingsArray.push({
      userId: 'auth0|62b3dec43ef05cf3b8d8cf74',
      reciverId: 'auth0|62b3ecaa3ef05cf3b8d8d0f4',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return queryInterface.bulkInsert('pings', pingsArray);
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
