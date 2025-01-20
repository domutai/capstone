// //Club Images Seed Devlopment
// 'use strict';

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
//     const clubImages = [];
//     for (let i = 1; i <= 24; i++) { // 24 clubs
//       for (let j = 1; j <= 3; j++) { // 3 images per club
//         clubImages.push({
//           club_id: i,
//           //image_url: `https://your-bucket-name.s3.amazonaws.com/club${i}-image${j}.jpg`,
//           image_url: `https://images.squarespace-cdn.com/content/v1/56e057cda3360c23799f9ec5/1636172869234-5IAHCKFXMGZF6OGARRHS/Nebula+Interior+3.jpg`,
//           description: `Image ${j} for Club ${i}`,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         });
//       }
//     }

//     await queryInterface.bulkInsert('ClubImages', clubImages);
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     await queryInterface.bulkDelete('ClubImages', null, {});
//   },
// };

//Club Images Seed Production
'use strict';

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
    const clubImages = [];
    for (let i = 1; i <= 24; i++) { // 24 clubs
      for (let j = 1; j <= 3; j++) { // 3 images per club
        clubImages.push({
          club_id: i,
          //image_url: `https://your-bucket-name.s3.amazonaws.com/club${i}-image${j}.jpg`,
          image_url: `https://images.squarespace-cdn.com/content/v1/56e057cda3360c23799f9ec5/1636172869234-5IAHCKFXMGZF6OGARRHS/Nebula+Interior+3.jpg`,
          description: `Image ${j} for Club ${i}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('ClubImages', clubImages);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ClubImages';
    await queryInterface.bulkDelete(options, null, { schema: options.schema });
  },
};
