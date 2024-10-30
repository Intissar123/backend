'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fournisseur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      fournisseur.belongsToMany(models.article, { through: 'cmdfournisseur' });
    }
  }
  fournisseur.init({
    refF: DataTypes.INTEGER,
    nomF: DataTypes.STRING,
    adresse: DataTypes.STRING,
    numTlp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fournisseur',
  });
  return fournisseur;
};