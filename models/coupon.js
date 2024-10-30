'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coupon.init({
    code: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    usageLimit: DataTypes.INTEGER,
    usedCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'coupon',
  });
  return coupon;
};