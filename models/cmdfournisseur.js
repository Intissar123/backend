'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cmdfournisseur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cmdfournisseur.belongsTo(models.article);
      cmdfournisseur.belongsTo(models.fournisseur);}
  }
    cmdfournisseur.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cmdfournisseur',
  });
  return cmdfournisseur;
};