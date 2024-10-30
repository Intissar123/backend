'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'services', // name of Target model
      'serviceCategoryId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'serviceCategories', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'services', // name of the Target model
      'serviceCategoryId', // key we want to remove
    );
  },
};
