'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



    return queryInterface.addColumn(
      'subcategories', // name of Target model
      'categoryId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'subcategories', // name of the Target model
      'categoryId' // key we want to remove
    );
  }
}
