'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class serviceCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // serviceCategory.hasMany(models.servicesubCategory);
      serviceCategory.hasMany(models.service);
    }
  }
  
  serviceCategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'serviceCategory',
    },
  );
  return serviceCategory;
}
