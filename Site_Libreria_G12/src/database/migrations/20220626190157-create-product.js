'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull : false
      },
      author: {
        type: Sequelize.STRING,
        allowNull : false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'categories'
          },
          key : 'id'
        }
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      language: {
        type: Sequelize.STRING,
        allowNull : false
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      format: {
        type: Sequelize.STRING,
        allowNull : false
      },
      editorial: {
        type: Sequelize.STRING,
        allowNull : false
      },
      description: {
        type: Sequelize.TEXT
      },
      stars : {
        type : Sequelize.INTEGER
    },
    discount : {
      type : Sequelize.INTEGER,
       defaultValue : 0
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
    await queryInterface.dropTable('Products');
  }
};