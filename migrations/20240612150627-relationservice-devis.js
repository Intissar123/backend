'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'devis', // name of Target model
      'serviceId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'services', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'devis', // name of the Target model
      'serviceId', // key we want to remove
    );
  },
};
