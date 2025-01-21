// //User Seed Devlopment
// 'use strict';
// const bcrypt = require("bcryptjs");


// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//     await queryInterface.bulkInsert('Users', [
//       { first_name: 'Demo', last_name: 'User', email: 'demoUser@test.com', password: bcrypt.hashSync('password'), role: 'user', createdAt: new Date(), updatedAt: new Date() },
//       { first_name: 'User2', last_name: 'Test', email: 'user2@test.com', password: bcrypt.hashSync('password'), role: 'user', createdAt: new Date(), updatedAt: new Date() },
//       { first_name: 'User3', last_name: 'Test', email: 'user3@test.com', password: bcrypt.hashSync('password'), role: 'user', createdAt: new Date(), updatedAt: new Date() },
//       { first_name: 'Owner1', last_name: 'Test', email: 'owner1@test.com', password: bcrypt.hashSync('password'), role: 'owner', createdAt: new Date(), updatedAt: new Date() },
//       { first_name: 'Owner2', last_name: 'Test', email: 'owner2@test.com', password: bcrypt.hashSync('password'), role: 'owner', createdAt: new Date(), updatedAt: new Date() },
//       { first_name: 'Demo', last_name: 'Owner', email: 'demoOwner@test.com', password: bcrypt.hashSync('password'), role: 'owner', createdAt: new Date(), updatedAt: new Date() },
//     ]);
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     await queryInterface.bulkDelete('Users', null, {});
//   }
// };

//User Seed Production
'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA || 'public';
 }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      { first_name: 'Demo', last_name: 'User', email: 'demoUser@test.com', password: bcrypt.hashSync('password'), role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { first_name: 'User2', last_name: 'Test', email: 'user2@test.com', password: bcrypt.hashSync('password'), role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { first_name: 'User3', last_name: 'Test', email: 'user3@test.com', password: bcrypt.hashSync('password'), role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { first_name: 'Owner1', last_name: 'Test', email: 'owner1@test.com', password: bcrypt.hashSync('password'), role: 'owner', createdAt: new Date(), updatedAt: new Date() },
      { first_name: 'Owner2', last_name: 'Test', email: 'owner2@test.com', password: bcrypt.hashSync('password'), role: 'owner', createdAt: new Date(), updatedAt: new Date() },
      { first_name: 'Demo', last_name: 'Owner', email: 'demoOwner@test.com', password: bcrypt.hashSync('password'), role: 'owner', createdAt: new Date(), updatedAt: new Date() },
    ], { schema: options.schema, validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, null, { schema: options.schema });
  }
};
