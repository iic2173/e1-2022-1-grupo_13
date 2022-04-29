'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const pingsArray = [];

    pingsArray.push({
      userId: 1,
      reciverId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    pingsArray.push({
      userId: 3,
      reciverId: 5,
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
