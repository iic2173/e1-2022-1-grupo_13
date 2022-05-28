'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     const tagsArray = [];

     tagsArray.push({
      category: 'Futbol',
      createdAt: new Date(),
      updatedAt: new Date(),
     });
     
     tagsArray.push({
      category: 'Basketball',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     tagsArray.push({
      category: 'Escalada',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     tagsArray.push({
      category: 'Gimnasio',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     tagsArray.push({
      category: 'Comida',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     tagsArray.push({
      category: 'Estudio',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     tagsArray.push({
      category: 'Yoga',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     tagsArray.push({
      category: 'Arte',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     tagsArray.push({
      category: 'Trekking',
      createdAt: new Date(),
      updatedAt: new Date(),
     });

     return queryInterface.bulkInsert('tags', tagsArray); 
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
