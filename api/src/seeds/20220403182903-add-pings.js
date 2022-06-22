'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const pingsArray = [];

    pingsArray.push({
      userId: 'auth0|62b26a570746edfe60cc3525',
      reciverId: 'auth0|62aa58d993b89ac09d1d71c0',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    pingsArray.push({
      userId: 'auth0|62b269aa92d2e26e683da0c9',
      reciverId: 'auth0|62b26a570746edfe60cc3525',
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
