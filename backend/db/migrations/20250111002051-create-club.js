// //CLUBS MIGRATIONS DEVELOPMENT

// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     await queryInterface.createTable('Clubs', {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       owner_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: { model: 'Users', key: 'id' },
//         onDelete: 'CASCADE',
//       },
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       location: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: Sequelize.TEXT,
//       },
//       main_image_url: {
//         type: Sequelize.STRING,
//       },
//       table_map_url: {
//         type: Sequelize.STRING,
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//     });

//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     await queryInterface.dropTable('Clubs');
//   },
// };

//CLUBS MIGRATIONS PRODUCTION

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA || 'public';  
 } 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Clubs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      main_image_url: {
        type: Sequelize.STRING(500),
      },
      table_map_url: {
        type: Sequelize.STRING(500),
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    }, options);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    options.tableName = "Clubs";
    return queryInterface.dropTable(options);
  },
};