'use strict';
const bcryptjs = require('bcryptjs')
const users = [
  {
    name : 'admin',
    lastname : 'admin',
    email : 'noeliaromina20@gmail.com',
    password : bcryptjs.hashSync('123456',10),
    rolId : 1,
    createdAt: new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
  },
  {
    name : 'user',
    lastname : 'invitado',
    email : 'invitado@gmail.com',
    password : bcryptjs.hashSync('123456',10),
    rolId : 2,
    createdAt: new Date(),
    updatedAt : new Date(),
    deletedAt : new Date()
   
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users',users , {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
    
  }
};
