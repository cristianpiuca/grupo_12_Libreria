'use strict';
const categories = [
  {
    name : 'ficción adulta',
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'juvenil',
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  },
   {
    name : 'autoayuda',
    createdAt : new Date(),
     updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'divulgación',
    createdAt : new Date(),
     updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'fantasía',
    createdAt : new Date(),
     updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'histórica',
    createdAt : new Date(),
     updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'no ficción',
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'policial y suspenso',
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categories',categories , {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
