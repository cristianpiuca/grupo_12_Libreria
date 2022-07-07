'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
         allowNull : false
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      password: {
        type: Sequelize.STRING
      },
      rolId: {
        type: Sequelize.INTEGER,
         allowNull : false,
        references : {
          model : {
            tableName : 'rols'
          },
          key : 'id'
        }
      },
      lastname: {
        type: Sequelize.STRING
      },
      birth: {
        type: Sequelize.DATE,
         
      },
      adress: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};