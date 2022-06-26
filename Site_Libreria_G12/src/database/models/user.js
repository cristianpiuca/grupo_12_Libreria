'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
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
   phone : DataTypes.INTEGER,
    image: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};