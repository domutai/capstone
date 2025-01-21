// //Clubs Seed Devlopment
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
//       { owner_id: 4, name: 'Manhattan Nights', location: '123 5th Ave, New York, NY 10011', description: 'A vibrant club in Manhattan.', main_image_url: 'https://img1.10bestmedia.com/Images/Photos/289135/p-Marquee_55_660x440.jpg', table_map_url: 'https://sheetsvip.com/sites/default/files/liv_nightclub_floor_plan_las_vegas_sheets_vip.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Brooklyn Beats', location: '456 Bedford Ave, Brooklyn, NY 11249', description: 'Brooklyn’s favorite club.', main_image_url: 'https://www.vmcdn.ca/f/files/bkreader/images/best-of-brooklyn/aiarticledanceclubs.jpg', table_map_url: 'https://cdn.prod.website-files.com/66b3ac2f00da3a265a234ae2/66b3cc8c97ef599a0050c3f6_Floor-Plan-4.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Empire Groove', location: '789 Broadway, New York, NY 10003', description: 'Feel the groove in the heart of NYC.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUmHaytdycrAxx-FkI1joRM1sIXwi8LUxGmg&s', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/marquee-floor-plan.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Broadway Bash', location: '234 W 42nd St, New York, NY 10036', description: 'A hotspot on Broadway.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWma_PwwuBR3fN9ZPL7JdZr3SadLlQYJiwQ&s', table_map_url: 'https://cdn.prod.website-files.com/66a8151258534c879f92ab24/66ad2a637cda290d4ed8a417_purefloorplan6.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Hudson Heat', location: '101 Hudson St, New York, NY 10013', description: 'Party by the Hudson River.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-1qfGDR-azo5nOJt0xaZv7TNjJmTr2buNA&s', table_map_url: 'https://sheetsvip.com/sites/default/files/liv_nightclub_floor_plan_las_vegas_sheets_vip.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Central Rhythm', location: '350 Central Park West, New York, NY 10025', description: 'Dance the night away in Central NYC.', main_image_url: 'https://media.timeout.com/images/105313444/image.jpg', table_map_url: 'https://cdn.prod.website-files.com/66b3ac2f00da3a265a234ae2/66b3cc8c97ef599a0050c3f6_Floor-Plan-4.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Uptown Funk', location: '200 W 125th St, New York, NY 10027', description: 'An iconic uptown club.', main_image_url: 'https://static01.nyt.com/newsgraphics/2021/06/28/nyc-nightlife/assets/images/latenight_016-2000.jpg', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/marquee-floor-plan.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Downtown Vibes', location: '90 Church St, New York, NY 10007', description: 'A favorite in downtown NYC.', main_image_url: 'https://imgcap.capturetheatlas.com/wp-content/uploads/2022/11/lavo-nightclub-new-york-city.jpg', table_map_url: 'https://cdn.prod.website-files.com/66a8151258534c879f92ab24/66ad2a637cda290d4ed8a417_purefloorplan6.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Times Square Tunes', location: '1560 Broadway, New York, NY 10036', description: 'Experience the energy of Times Square.', main_image_url: 'https://imgcap.capturetheatlas.com/wp-content/uploads/2022/11/marquee-nightclub-in-nyc.jpg', table_map_url: 'https://sheetsvip.com/sites/default/files/liv_nightclub_floor_plan_las_vegas_sheets_vip.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Harlem Harmony', location: '230 W 135th St, New York, NY 10030', description: 'Harlem’s premier club.', main_image_url: 'https://gameplan-image-urls.s3.amazonaws.com/nyc_real_crowd.jpg', table_map_url: 'https://cdn.prod.website-files.com/66b3ac2f00da3a265a234ae2/66b3cc8c97ef599a0050c3f6_Floor-Plan-4.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Queens Pulse', location: '37-20 Prince St, Flushing, NY 11354', description: 'A hidden gem in Queens.', main_image_url: 'https://media.cntraveler.com/photos/5ec44fcc514feb9a7bbe3ebc/master/pass/HouseofYes-2020-KennyRodriguez.jpg', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/marquee-floor-plan.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Bronx Bounce', location: '820 River Ave, Bronx, NY 10451', description: 'A Bronx nightlife staple.', main_image_url: 'https://www.thenewyorknightlife.com/cdn/shop/products/NIGHTCLUB1_1024x1024.jpg?v=1571438526', table_map_url: 'https://cdn.prod.website-files.com/66a8151258534c879f92ab24/66ad2a637cda290d4ed8a417_purefloorplan6.jpg', createdAt: new Date(), updatedAt: new Date() },
      
//       // Los Angeles Clubs
//       { owner_id: 4, name: 'Hollywood Hype', location: '6801 Hollywood Blvd, Los Angeles, CA 90028', description: 'Feel like a star in Hollywood.', main_image_url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/99/51/92/event-at-club-hollywood.jpg?w=1200&h=-1&s=1', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Ballet-Los%20Angeles-6', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Sunset Groove', location: '8462 Sunset Blvd, Los Angeles, CA 90069', description: 'Groove under the LA sunset.', main_image_url: 'https://www.billboard.com/wp-content/uploads/2024/01/the-spotlight-hollywood-venue-cr-restless-media-1-1548.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Liaison-Los%20Angeles-8', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Venice Vibes', location: '1715 Pacific Ave, Venice, CA 90291', description: 'Venice Beach’s coolest club.', main_image_url: 'https://www.hollywoodclubcrawl.com/wp-content/uploads/2019/07/station1640.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Lure-Los%20Angeles-7', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 4, name: 'Beverly Beats', location: '9876 Wilshire Blvd, Beverly Hills, CA 90210', description: 'Party in Beverly Hills.', main_image_url: 'https://academy.la/wp-content/uploads/2024/06/best-club-near-me-hollywood-1024x576.webp', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/1oak-floor-plan1-2.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Malibu Melodies', location: '23000 Pacific Coast Hwy, Malibu, CA 90265', description: 'A Malibu favorite.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW95f9FmI43lAcfTDa7oLHhU-DlDezUEVH5g&s', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Ballet-Los%20Angeles-6', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Downtown LA Nights', location: '111 S Grand Ave, Los Angeles, CA 90012', description: 'The best in Downtown LA.', main_image_url: 'https://academy.la/wp-content/uploads/2024/06/upcoming-dance-club-events-near-me-hollywood-1024x576.webp', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Liaison-Los%20Angeles-8',createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Echo Park Pulse', location: '751 Echo Park Ave, Los Angeles, CA 90026', description: 'Catch the rhythm in Echo Park.', main_image_url: 'https://live.staticflickr.com/789/39478094140_32c4e33e4f_b.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Lure-Los%20Angeles-7', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 5, name: 'Silver Lake Sound', location: '2412 Hyperion Ave, Los Angeles, CA 90027', description: 'Silver Lake’s trendiest spot.', main_image_url: 'https://ca-times.brightspotcdn.com/dims4/default/76fd1c9/2147483647/strip/true/crop/6623x4261+0+0/resize/1200x772!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffb%2F0d%2F88283d2e4b7c81b6183bcde32554%2F1410713-et-spotlight-nightclub-15.jpg', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/1oak-floor-plan1-2.jpg', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Santa Monica Sounds', location: '123 Santa Monica Blvd, Santa Monica, CA 90401', description: 'Dance by the ocean.', main_image_url: 'https://patch.com/img/cdn/users/151079/2011/03/raw/c52f1e425bf64d3861b23a8a02503d89.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Ballet-Los%20Angeles-6', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Westwood Wave', location: '10920 Wilshire Blvd, Los Angeles, CA 90024', description: 'Westwood’s ultimate club.', main_image_url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/07/e6/ac/hollywood-club.jpg?w=900&h=500&s=1', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Liaison-Los%20Angeles-8', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Pasadena Pulse', location: '300 E Colorado Blvd, Pasadena, CA 91101', description: 'Pasadena’s nightlife hub.', main_image_url: 'https://www.tripsavvy.com/thmb/PnJ0x23mYUZcvO60bQ7mmwOoRdY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/KMD09AvalonHwd_115lg-586774ef5f9b586e02b45a4e.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Lure-Los%20Angeles-7', createdAt: new Date(), updatedAt: new Date() },
//       { owner_id: 6, name: 'Culver City Groove', location: '10708 Washington Blvd, Culver City, CA 90232', description: 'Culver City’s favorite club.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVVqwPHpsws0BosXyzcZCtvOUKg27h3Sjs1A&s', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/1oak-floor-plan1-2.jpg', createdAt: new Date(), updatedAt: new Date() },
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
      { owner_id: 4, name: 'Manhattan Nights', location: '123 5th Ave, New York, NY 10011', description: 'A vibrant club in Manhattan.', main_image_url: 'https://img1.10bestmedia.com/Images/Photos/289135/p-Marquee_55_660x440.jpg', table_map_url: 'https://sheetsvip.com/sites/default/files/liv_nightclub_floor_plan_las_vegas_sheets_vip.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Brooklyn Beats', location: '456 Bedford Ave, Brooklyn, NY 11249', description: 'Brooklyn’s favorite club.', main_image_url: 'https://www.vmcdn.ca/f/files/bkreader/images/best-of-brooklyn/aiarticledanceclubs.jpg', table_map_url: 'https://cdn.prod.website-files.com/66b3ac2f00da3a265a234ae2/66b3cc8c97ef599a0050c3f6_Floor-Plan-4.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Empire Groove', location: '789 Broadway, New York, NY 10003', description: 'Feel the groove in the heart of NYC.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUmHaytdycrAxx-FkI1joRM1sIXwi8LUxGmg&s', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/marquee-floor-plan.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Broadway Bash', location: '234 W 42nd St, New York, NY 10036', description: 'A hotspot on Broadway.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWma_PwwuBR3fN9ZPL7JdZr3SadLlQYJiwQ&s', table_map_url: 'https://cdn.prod.website-files.com/66a8151258534c879f92ab24/66ad2a637cda290d4ed8a417_purefloorplan6.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Hudson Heat', location: '101 Hudson St, New York, NY 10013', description: 'Party by the Hudson River.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-1qfGDR-azo5nOJt0xaZv7TNjJmTr2buNA&s', table_map_url: 'https://sheetsvip.com/sites/default/files/liv_nightclub_floor_plan_las_vegas_sheets_vip.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Central Rhythm', location: '350 Central Park West, New York, NY 10025', description: 'Dance the night away in Central NYC.', main_image_url: 'https://media.timeout.com/images/105313444/image.jpg', table_map_url: 'https://cdn.prod.website-files.com/66b3ac2f00da3a265a234ae2/66b3cc8c97ef599a0050c3f6_Floor-Plan-4.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Uptown Funk', location: '200 W 125th St, New York, NY 10027', description: 'An iconic uptown club.', main_image_url: 'https://static01.nyt.com/newsgraphics/2021/06/28/nyc-nightlife/assets/images/latenight_016-2000.jpg', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/marquee-floor-plan.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Downtown Vibes', location: '90 Church St, New York, NY 10007', description: 'A favorite in downtown NYC.', main_image_url: 'https://imgcap.capturetheatlas.com/wp-content/uploads/2022/11/lavo-nightclub-new-york-city.jpg', table_map_url: 'https://cdn.prod.website-files.com/66a8151258534c879f92ab24/66ad2a637cda290d4ed8a417_purefloorplan6.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Times Square Tunes', location: '1560 Broadway, New York, NY 10036', description: 'Experience the energy of Times Square.', main_image_url: 'https://imgcap.capturetheatlas.com/wp-content/uploads/2022/11/marquee-nightclub-in-nyc.jpg', table_map_url: 'https://sheetsvip.com/sites/default/files/liv_nightclub_floor_plan_las_vegas_sheets_vip.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Harlem Harmony', location: '230 W 135th St, New York, NY 10030', description: 'Harlem’s premier club.', main_image_url: 'https://gameplan-image-urls.s3.amazonaws.com/nyc_real_crowd.jpg', table_map_url: 'https://cdn.prod.website-files.com/66b3ac2f00da3a265a234ae2/66b3cc8c97ef599a0050c3f6_Floor-Plan-4.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Queens Pulse', location: '37-20 Prince St, Flushing, NY 11354', description: 'A hidden gem in Queens.', main_image_url: 'https://media.cntraveler.com/photos/5ec44fcc514feb9a7bbe3ebc/master/pass/HouseofYes-2020-KennyRodriguez.jpg', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/marquee-floor-plan.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Bronx Bounce', location: '820 River Ave, Bronx, NY 10451', description: 'A Bronx nightlife staple.', main_image_url: 'https://www.thenewyorknightlife.com/cdn/shop/products/NIGHTCLUB1_1024x1024.jpg?v=1571438526', table_map_url: 'https://cdn.prod.website-files.com/66a8151258534c879f92ab24/66ad2a637cda290d4ed8a417_purefloorplan6.jpg', createdAt: new Date(), updatedAt: new Date() },
      
      // Los Angeles Clubs
      { owner_id: 4, name: 'Hollywood Hype', location: '6801 Hollywood Blvd, Los Angeles, CA 90028', description: 'Feel like a star in Hollywood.', main_image_url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/99/51/92/event-at-club-hollywood.jpg?w=1200&h=-1&s=1', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Ballet-Los%20Angeles-6', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Sunset Groove', location: '8462 Sunset Blvd, Los Angeles, CA 90069', description: 'Groove under the LA sunset.', main_image_url: 'https://www.billboard.com/wp-content/uploads/2024/01/the-spotlight-hollywood-venue-cr-restless-media-1-1548.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Liaison-Los%20Angeles-8', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Venice Vibes', location: '1715 Pacific Ave, Venice, CA 90291', description: 'Venice Beach’s coolest club.', main_image_url: 'https://www.hollywoodclubcrawl.com/wp-content/uploads/2019/07/station1640.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Lure-Los%20Angeles-7', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 4, name: 'Beverly Beats', location: '9876 Wilshire Blvd, Beverly Hills, CA 90210', description: 'Party in Beverly Hills.', main_image_url: 'https://academy.la/wp-content/uploads/2024/06/best-club-near-me-hollywood-1024x576.webp', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/1oak-floor-plan1-2.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Malibu Melodies', location: '23000 Pacific Coast Hwy, Malibu, CA 90265', description: 'A Malibu favorite.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW95f9FmI43lAcfTDa7oLHhU-DlDezUEVH5g&s', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Ballet-Los%20Angeles-6', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Downtown LA Nights', location: '111 S Grand Ave, Los Angeles, CA 90012', description: 'The best in Downtown LA.', main_image_url: 'https://academy.la/wp-content/uploads/2024/06/upcoming-dance-club-events-near-me-hollywood-1024x576.webp', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Liaison-Los%20Angeles-8',createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Echo Park Pulse', location: '751 Echo Park Ave, Los Angeles, CA 90026', description: 'Catch the rhythm in Echo Park.', main_image_url: 'https://live.staticflickr.com/789/39478094140_32c4e33e4f_b.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Lure-Los%20Angeles-7', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 5, name: 'Silver Lake Sound', location: '2412 Hyperion Ave, Los Angeles, CA 90027', description: 'Silver Lake’s trendiest spot.', main_image_url: 'https://ca-times.brightspotcdn.com/dims4/default/76fd1c9/2147483647/strip/true/crop/6623x4261+0+0/resize/1200x772!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffb%2F0d%2F88283d2e4b7c81b6183bcde32554%2F1410713-et-spotlight-nightclub-15.jpg', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/1oak-floor-plan1-2.jpg', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Santa Monica Sounds', location: '123 Santa Monica Blvd, Santa Monica, CA 90401', description: 'Dance by the ocean.', main_image_url: 'https://patch.com/img/cdn/users/151079/2011/03/raw/c52f1e425bf64d3861b23a8a02503d89.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Ballet-Los%20Angeles-6', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Westwood Wave', location: '10920 Wilshire Blvd, Los Angeles, CA 90024', description: 'Westwood’s ultimate club.', main_image_url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/07/e6/ac/hollywood-club.jpg?w=900&h=500&s=1', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Liaison-Los%20Angeles-8', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Pasadena Pulse', location: '300 E Colorado Blvd, Pasadena, CA 91101', description: 'Pasadena’s nightlife hub.', main_image_url: 'https://www.tripsavvy.com/thmb/PnJ0x23mYUZcvO60bQ7mmwOoRdY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/KMD09AvalonHwd_115lg-586774ef5f9b586e02b45a4e.jpg', table_map_url: 'https://clubbable.blob.core.windows.net/medias/Lure-Los%20Angeles-7', createdAt: new Date(), updatedAt: new Date() },
      { owner_id: 6, name: 'Culver City Groove', location: '10708 Washington Blvd, Culver City, CA 90232', description: 'Culver City’s favorite club.', main_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVVqwPHpsws0BosXyzcZCtvOUKg27h3Sjs1A&s', table_map_url: 'https://clubbookers.com/wp-content/uploads/2021/12/1oak-floor-plan1-2.jpg', createdAt: new Date(), updatedAt: new Date() },
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

