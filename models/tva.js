'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tva.init({
    code: DataTypes.STRING,
    designation: DataTypes.STRING,
    vatValue: DataTypes.FLOAT,
    vatType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tva',
  });
  return tva;
};