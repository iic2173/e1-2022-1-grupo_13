'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rooms',[{
      uuid: '60b40630-713c-11ec-8cff-7f82f42f57ce',
      name: 'Global Chat',
      entity_owner: '60b40630-713c-11ec-8cff-7f82f42f57ce',
      level_admin: 1,
      type: 'group',
      max_entity_rules: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }] )
  },

  async down (queryInterface, Sequelize) {


    await queryInterface.bulkDelete('Rooms', {[Sequelize.Op.or]: [{name: 'Global Chat' }]});

  }
};
