'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // facture.belongsTo(models.commande);
      
    }
  }
  facture.init({
    numFacture: DataTypes.STRING,
    date: DataTypes.DATE,
    totalHT: DataTypes.DOUBLE,
    totalTVA: DataTypes.DOUBLE,
    totalTTC: DataTypes.DOUBLE,
    statut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'facture',
  });
  return facture;
};