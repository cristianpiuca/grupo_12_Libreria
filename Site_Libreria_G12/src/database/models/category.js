'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
 
    static associate(models) {
      Category.hasMany(models.Product, {
        as : 'products',
        foreignKey : 'categoryId' //present on product model 
      })
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};