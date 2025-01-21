//BOOKINGS MIGRATIONS DEVELOPMENT

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
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      table_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tables', key: 'id' },
        onDelete: 'CASCADE',
      },
      booking_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      booking_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'canceled'),
        defaultValue: 'pending',
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
    await queryInterface.dropTable('Bookings');
  },
};


// //BOOKINGS MIGRATIONS PRODUCTION
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
//     await queryInterface.createTable('Bookings', {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       user_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: { model: 'Users', key: 'id' },
//         onDelete: 'CASCADE',
//       },
//       table_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: { model: 'Tables', key: 'id' },
//         onDelete: 'CASCADE',
//       },
//       booking_date: {
//         type: Sequelize.DATEONLY,
//         allowNull: false,
//       },
//       booking_time: {
//         type: Sequelize.TIME,
//         allowNull: false,
//       },
//       status: {
//         type: Sequelize.ENUM('pending', 'confirmed', 'canceled'),
//         defaultValue: 'pending',
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
//     options.tableName = "Bookings";
//     return queryInterface.dropTable(options);
//   },
// };
