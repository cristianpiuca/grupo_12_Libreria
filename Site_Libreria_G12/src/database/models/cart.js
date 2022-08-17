'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
   
    static associate(models) {
      Cart.belongsTo(models.Order, {
        as : 'order',
        foreignKey : 'orderId' 
      });
      Cart.belongsTo(models.User, {
        as : 'user',
        foreignKey : 'userId' 
      });
      Cart.belongsTo(models.Product, {
        as : 'products',
        foreignKey : 'productId' 
      });
    }
  }
  Cart.init({
    quantify: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};