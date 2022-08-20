'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
  
    static associate(models) {
      Order.hasMany(models.Cart, {
        as : 'carts',
        foreignKey : 'orderId',
        onDelete: 'cascade'
      })
      Order.belongsTo(models.User, {
        as : 'user',
        foreignKey : 'userId'
      })
      Order.belongsTo(models.Status, {
        as : 'status',
        foreignKey : 'statusId'
      })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};