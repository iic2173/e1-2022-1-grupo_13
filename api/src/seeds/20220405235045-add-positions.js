'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     const positionsArray = [];
      const pos = 'SRID=4326;POINT(-33.498532 -70.614023)'; // Datatype geometry en postgis

     positionsArray.push({
      userId: 2,
      title: 'My university',
      geography: pos,
      createdAt: new Date(),
      updatedAt: new Date(),
     });
     
     const pos1 = 'SRID=4326;POINT(40.71598 -74.002881)'; // Datatype geometry en postgis

     positionsArray.push({
      userId: 3,
      title: 'Sanctum Sanctorum',
      geography: pos1,
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     const pos2 = 'SRID=4326;POINT(30.00944 31.20861)'; // Datatype geometry en postgis

     positionsArray.push({
      userId: 4,
      title: 'Piramides de Giza',
      geography: pos2,
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     return queryInterface.bulkInsert('positions', positionsArray); 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
