'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cartItem.belongsTo(models.order, { foreignKey: 'orderId' });

    }
  }
  cartItem.init({
    prix: DataTypes.DECIMAL,
    nomP: DataTypes.STRING,
    image: DataTypes.STRING,
    qte: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cartItem',
  });
  return cartItem;
};