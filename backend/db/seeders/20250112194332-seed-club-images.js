//Club Images Seed Devlopment
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
    const clubImages = [];
    for (let i = 1; i <= 24; i++) { // 24 clubs
      for (let j = 1; j <= 3; j++) { // 3 images per club
        clubImages.push({
          club_id: i,
          image_url: `https://your-bucket-name.s3.amazonaws.com/club${i}-image${j}.jpg`,
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
    await queryInterface.bulkDelete('ClubImages', null, {});
  },
};
