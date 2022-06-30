'use strict';
const imagesDb = require('../../data/images.json');
const images = imagesDb.map(({image},i) => {
  return {
   file : image,
   productId : i + 1, 
    createdAt : new Date(),
    updatedAt : new Date(),
    deletedAt: new Date()

  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Images',images , {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Images', null, {});
    
  }
};
