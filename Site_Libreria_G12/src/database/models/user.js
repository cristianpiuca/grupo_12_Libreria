'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
    lastname: DataTypes.STRING,
   birth :DataTypes.DATE,
   adress :DataTypes.STRING,
   state :DataTypes.STRING,
   phone : DataTypes.STRING,
    image: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};