'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
        Product.belongsTo(models.Category, {
          as : 'category',
          foreignKey : 'categoryId' 
        });

        Product.hasMany(models.Image, {
          as : 'images',
          foreignKey : 'productId' 
        })
    }
  }
  Product.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    language: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    format: DataTypes.STRING,
    editorial: DataTypes.STRING,
    description: DataTypes.TEXT,
    stars : DataTypes.INTEGER,
    discount : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};