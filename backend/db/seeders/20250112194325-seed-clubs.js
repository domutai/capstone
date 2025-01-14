//Clubs Seed Devlopment
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
//     const clubs = [
//       // New York Clubs
//       { owner_id: 4, name: 'Manhattan Nights', location: '123 5th Ave, New York, NY 10011', description: 'A vibrant club in Manhattan.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/manhattan-nights-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/manhattan-nights-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Brooklyn Beats', location: '456 Bedford Ave, Brooklyn, NY 11249', description: 'Brooklyn’s favorite club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Empire Groove', location: '789 Broadway, New York, NY 10003', description: 'Feel the groove in the heart of NYC.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/empire-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/empire-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Broadway Bash', location: '234 W 42nd St, New York, NY 10036', description: 'A hotspot on Broadway.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/broadway-bash-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/broadway-bash-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Hudson Heat', location: '101 Hudson St, New York, NY 10013', description: 'Party by the Hudson River.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/hudson-heat-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/hudson-heat-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Central Rhythm', location: '350 Central Park West, New York, NY 10025', description: 'Dance the night away in Central NYC.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/central-rhythm-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/central-rhythm-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Uptown Funk', location: '200 W 125th St, New York, NY 10027', description: 'An iconic uptown club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/uptown-funk-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/uptown-funk-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Downtown Vibes', location: '90 Church St, New York, NY 10007', description: 'A favorite in downtown NYC.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-vibes-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-vibes-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Times Square Tunes', location: '1560 Broadway, New York, NY 10036', description: 'Experience the energy of Times Square.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/times-square-tunes-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/times-square-tunes-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Harlem Harmony', location: '230 W 135th St, New York, NY 10030', description: 'Harlem’s premier club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/harlem-harmony-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/harlem-harmony-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Queens Pulse', location: '37-20 Prince St, Flushing, NY 11354', description: 'A hidden gem in Queens.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/queens-pulse-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/queens-pulse-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Bronx Bounce', location: '820 River Ave, Bronx, NY 10451', description: 'A Bronx nightlife staple.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/bronx-bounce-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/bronx-bounce-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      
//       // Los Angeles Clubs
//       { owner_id: 4, name: 'Hollywood Hype', location: '6801 Hollywood Blvd, Los Angeles, CA 90028', description: 'Feel like a star in Hollywood.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/hollywood-hype-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/hollywood-hype-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Sunset Groove', location: '8462 Sunset Blvd, Los Angeles, CA 90069', description: 'Groove under the LA sunset.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Venice Vibes', location: '1715 Pacific Ave, Venice, CA 90291', description: 'Venice Beach’s coolest club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/venice-vibes-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/venice-vibes-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Beverly Beats', location: '9876 Wilshire Blvd, Beverly Hills, CA 90210', description: 'Party in Beverly Hills.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/beverly-beats-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/beverly-beats-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Malibu Melodies', location: '23000 Pacific Coast Hwy, Malibu, CA 90265', description: 'A Malibu favorite.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/malibu-melodies-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/malibu-melodies-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Downtown LA Nights', location: '111 S Grand Ave, Los Angeles, CA 90012', description: 'The best in Downtown LA.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-la-nights-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-la-nights-table-map.jpg',createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Echo Park Pulse', location: '751 Echo Park Ave, Los Angeles, CA 90026', description: 'Catch the rhythm in Echo Park.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/echo-park-pulse-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/echo-park-pulse-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Silver Lake Sound', location: '2412 Hyperion Ave, Los Angeles, CA 90027', description: 'Silver Lake’s trendiest spot.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/silver-lake-sound-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/silver-lake-sound-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Santa Monica Sounds', location: '123 Santa Monica Blvd, Santa Monica, CA 90401', description: 'Dance by the ocean.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/santa-monica-sounds-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/santa-monica-sounds-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Westwood Wave', location: '10920 Wilshire Blvd, Los Angeles, CA 90024', description: 'Westwood’s ultimate club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/westwood-wave-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/westwood-wave-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Pasadena Pulse', location: '300 E Colorado Blvd, Pasadena, CA 91101', description: 'Pasadena’s nightlife hub.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/pasadena-pulse-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/pasadena-pulse-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Culver City Groove', location: '10708 Washington Blvd, Culver City, CA 90232', description: 'Culver City’s favorite club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/culver-city-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/culver-city-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
//     ];

//     await queryInterface.bulkInsert('Clubs', clubs);

//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     await queryInterface.bulkDelete('Clubs', null, {});
//   },
// };

//Clubs Seed Production
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
    const clubs = [
      // New York Clubs
      { owner_id: 4, name: 'Manhattan Nights', location: '123 5th Ave, New York, NY 10011', description: 'A vibrant club in Manhattan.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/manhattan-nights-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/manhattan-nights-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Brooklyn Beats', location: '456 Bedford Ave, Brooklyn, NY 11249', description: 'Brooklyn’s favorite club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Empire Groove', location: '789 Broadway, New York, NY 10003', description: 'Feel the groove in the heart of NYC.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/empire-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/empire-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Broadway Bash', location: '234 W 42nd St, New York, NY 10036', description: 'A hotspot on Broadway.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/broadway-bash-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/broadway-bash-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Hudson Heat', location: '101 Hudson St, New York, NY 10013', description: 'Party by the Hudson River.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/hudson-heat-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/hudson-heat-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Central Rhythm', location: '350 Central Park West, New York, NY 10025', description: 'Dance the night away in Central NYC.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/central-rhythm-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/central-rhythm-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Uptown Funk', location: '200 W 125th St, New York, NY 10027', description: 'An iconic uptown club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/uptown-funk-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/uptown-funk-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Downtown Vibes', location: '90 Church St, New York, NY 10007', description: 'A favorite in downtown NYC.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-vibes-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-vibes-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Times Square Tunes', location: '1560 Broadway, New York, NY 10036', description: 'Experience the energy of Times Square.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/times-square-tunes-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/times-square-tunes-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Harlem Harmony', location: '230 W 135th St, New York, NY 10030', description: 'Harlem’s premier club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/harlem-harmony-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/harlem-harmony-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Queens Pulse', location: '37-20 Prince St, Flushing, NY 11354', description: 'A hidden gem in Queens.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/queens-pulse-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/queens-pulse-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Bronx Bounce', location: '820 River Ave, Bronx, NY 10451', description: 'A Bronx nightlife staple.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/bronx-bounce-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/bronx-bounce-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      
      // Los Angeles Clubs
      { owner_id: 4, name: 'Hollywood Hype', location: '6801 Hollywood Blvd, Los Angeles, CA 90028', description: 'Feel like a star in Hollywood.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/hollywood-hype-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/hollywood-hype-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Sunset Groove', location: '8462 Sunset Blvd, Los Angeles, CA 90069', description: 'Groove under the LA sunset.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/sunset-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Venice Vibes', location: '1715 Pacific Ave, Venice, CA 90291', description: 'Venice Beach’s coolest club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/venice-vibes-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/venice-vibes-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Beverly Beats', location: '9876 Wilshire Blvd, Beverly Hills, CA 90210', description: 'Party in Beverly Hills.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/beverly-beats-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/beverly-beats-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Malibu Melodies', location: '23000 Pacific Coast Hwy, Malibu, CA 90265', description: 'A Malibu favorite.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/malibu-melodies-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/malibu-melodies-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Downtown LA Nights', location: '111 S Grand Ave, Los Angeles, CA 90012', description: 'The best in Downtown LA.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-la-nights-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/downtown-la-nights-table-map.jpg',createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Echo Park Pulse', location: '751 Echo Park Ave, Los Angeles, CA 90026', description: 'Catch the rhythm in Echo Park.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/echo-park-pulse-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/echo-park-pulse-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Silver Lake Sound', location: '2412 Hyperion Ave, Los Angeles, CA 90027', description: 'Silver Lake’s trendiest spot.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/silver-lake-sound-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/silver-lake-sound-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Santa Monica Sounds', location: '123 Santa Monica Blvd, Santa Monica, CA 90401', description: 'Dance by the ocean.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/santa-monica-sounds-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/santa-monica-sounds-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Westwood Wave', location: '10920 Wilshire Blvd, Los Angeles, CA 90024', description: 'Westwood’s ultimate club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/westwood-wave-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/westwood-wave-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Pasadena Pulse', location: '300 E Colorado Blvd, Pasadena, CA 91101', description: 'Pasadena’s nightlife hub.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/pasadena-pulse-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/pasadena-pulse-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Culver City Groove', location: '10708 Washington Blvd, Culver City, CA 90232', description: 'Culver City’s favorite club.', main_image_url: 'https://your-bucket-name.s3.amazonaws.com/culver-city-groove-main.jpg', table_map_url: 'https://your-bucket-name.s3.amazonaws.com/culver-city-groove-table-map.jpg', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Clubs', clubs);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Clubs';
    await queryInterface.bulkDelete(options, null, { schema: options.schema });
  },
};

