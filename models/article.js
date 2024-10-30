'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      article.hasMany(models.depot);

     // article.belongsToMany(models.commande, { through: 'commandelines' });

      article.belongsToMany(models.fournisseur, { through: 'cmdfournisseur' });

      article.belongsTo(models.subcategory);
    }
  }
  article.init(
    {
      code: DataTypes.STRING,
      nomP: DataTypes.STRING,
      prix: DataTypes.DOUBLE,
      TVA: DataTypes.FLOAT,
      statut: DataTypes.STRING,
      image: DataTypes.JSON,
      qte: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'article',
    },
  );
  return article;
};