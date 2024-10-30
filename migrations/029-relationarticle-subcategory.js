'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'articles', // name of Target model
      'subcategoryId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'subcategories', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'articles', // name of the Target model
      'subcategoryId', // key we want to remove
    );
  },
};
