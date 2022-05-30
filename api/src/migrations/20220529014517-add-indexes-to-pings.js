'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pings', 'sidi', {
      type: Sequelize.DOUBLE,
      defaultValue: 0
    });
    await queryInterface.addColumn('pings', 'siin', {
      type: Sequelize.DOUBLE,
      defaultValue: 0
    });
    await queryInterface.addColumn('pings', 'dindin', {
      type: Sequelize.DOUBLE,
      defaultValue: 0
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('pings', 'sidi');
    await queryInterface.removeColumn('pings', 'siin');
    await queryInterface.removeColumn('pings', 'dindin');
  },
};
