'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class depot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      depot.belongsTo(models.article)    }
  }
  depot.init({
    QuantiteStock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'depot',
  });
  return depot;
};