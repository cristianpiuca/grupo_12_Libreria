'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('People', [{
       name: 'John Doe',
       isBetaMember: false
     }], {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('People', null, {});
    
  }
};
