//CLUB IMAGES DEVELOPMENT
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('ClubImages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      club_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Clubs', key: 'id' },
        onDelete: 'CASCADE',
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('ClubImages');
  },
};


//CLUB IMAGES PRODUCTION
// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA || 'public';  
//  }

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     await queryInterface.createTable('ClubImages', {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       club_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: { model: 'Clubs', key: 'id' },
//         onDelete: 'CASCADE',
//       },
//       image_url: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//     }, options);
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     options.tableName = "ClubImages";
//     return queryInterface.dropTable(options);
//   },
// };