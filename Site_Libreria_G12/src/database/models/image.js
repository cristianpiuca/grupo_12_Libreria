'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
   
    static associate(models) {
      Image.belongsTo(models.Product, {
        as : 'product',
        foreignKey : 'productId' 
      });
    }
  }
  Image.init({
    file: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images'
  });
  return Image;
};