'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



    return queryInterface.addColumn(
      'depots', // name of Target model
      'articleId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'articles', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'depots', // name of the Target model
      'ArticleId' // key we want to remove
    );
  }
}
