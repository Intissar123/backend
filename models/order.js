'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     order.belongsTo(models.user, { foreignKey: 'userId' });
     models.order.hasMany(models.cartItem, { as: 'cartItems' });
    }
  }
  order.init(
    {
      totalAmount: DataTypes.DECIMAL,
      delivery: DataTypes.STRING,
      location: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      status: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'en cours',
      },
    },
    {
      sequelize,
      modelName: 'order',
    },
  );
  return order;
};