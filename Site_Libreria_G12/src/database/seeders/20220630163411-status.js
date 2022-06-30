'use strict';
const statuses = [
  {
    name : 'en proceso',
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'cancelado',
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'finalizado',
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Statuses',statuses , {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Statuses', null, {});
    
  }
};
