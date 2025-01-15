// //Bookings Seed Devlopment
'use strict';

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
    const bookings = [
      // Bookings for User 1
      {
        user_id: 1,
        table_id: 1, // VIP Table in Club 1 (Manhattan Nights)
        booking_date: '2025-02-14',
        booking_time: '19:00:00',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        table_id: 8, // Standard Table in Club 3 (Empire Groove)
        booking_date: '2025-03-21',
        booking_time: '21:00:00',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bookings for User 2
      {
        user_id: 2,
        table_id: 5, // Standard Table in Club 2 (Brooklyn Beats)
        booking_date: '2025-05-10',
        booking_time: '20:30:00',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        table_id: 15, // Exclusive Table in Club 5 (Hudson Heat)
        booking_date: '2025-08-18',
        booking_time: '22:00:00',
        status: 'canceled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bookings for User 3
      {
        user_id: 3,
        table_id: 37, // VIP Table in Club 13 (Hollywood Hype)
        booking_date: '2025-04-15',
        booking_time: '20:00:00',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        table_id: 44, // Standard Table in Club 15 (Venice Vibes)
        booking_date: '2025-06-20',
        booking_time: '22:30:00',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Bookings', bookings);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};

//Bookings Seed Production
// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA || 'public';
//  }

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
//     const bookings = [
//       // Bookings for User 1
//       {
//         user_id: 1,
//         table_id: 1, // VIP Table in Club 1 (Manhattan Nights)
//         booking_date: '2025-02-14',
//         booking_time: '19:00:00',
//         status: 'confirmed',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         user_id: 1,
//         table_id: 8, // Standard Table in Club 3 (Empire Groove)
//         booking_date: '2025-03-21',
//         booking_time: '21:00:00',
//         status: 'pending',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       // Bookings for User 2
//       {
//         user_id: 2,
//         table_id: 5, // Standard Table in Club 2 (Brooklyn Beats)
//         booking_date: '2025-05-10',
//         booking_time: '20:30:00',
//         status: 'confirmed',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         user_id: 2,
//         table_id: 15, // Exclusive Table in Club 5 (Hudson Heat)
//         booking_date: '2025-08-18',
//         booking_time: '22:00:00',
//         status: 'canceled',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       // Bookings for User 3
//       {
//         user_id: 3,
//         table_id: 37, // VIP Table in Club 13 (Hollywood Hype)
//         booking_date: '2025-04-15',
//         booking_time: '20:00:00',
//         status: 'confirmed',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         user_id: 3,
//         table_id: 44, // Standard Table in Club 15 (Venice Vibes)
//         booking_date: '2025-06-20',
//         booking_time: '22:30:00',
//         status: 'pending',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ];

//     await queryInterface.bulkInsert('Bookings', bookings);
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     options.tableName = 'Bookings';
//     await queryInterface.bulkDelete(options, null, { schema: options.schema });
//   },
// };
