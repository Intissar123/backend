'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class devis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       devis.belongsTo(models.service, {
         foreignKey: 'serviceId',
       });
    }
  }
  devis.init(
    {
      email: DataTypes.STRING,
      message: DataTypes.STRING,
      
    },
    {
      sequelize,
      modelName: 'devis',
    },
  );
  return devis;
};