'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('position_tags', {
    positionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'positions',
        key: 'id',
      },
    },
    tagId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'tags',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

  }),

  down: async (queryInterface) => queryInterface.dropTable('position_tags'),

};
