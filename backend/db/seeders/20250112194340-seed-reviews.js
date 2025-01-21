//Reviews Seed Devlopment
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
    const reviews = [
      // Reviews for New York Clubs
      { user_id: 1, club_id: 1, rating: 5, review_text: 'Amazing vibe! The DJ was incredible, and the staff was super friendly.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 1, rating: 4, review_text: 'Great club, but the drinks were a bit overpriced.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 1, rating: 3, review_text: 'The music was too loud for my taste, but the decor was nice.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 2, rating: 5, review_text: 'Loved the Brooklyn energy! Will definitely come back.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 2, rating: 4, review_text: 'Fantastic drinks, but it was a bit crowded.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 2, rating: 2, review_text: 'Not my scene. It felt too cramped.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 3, rating: 4, review_text: 'The atmosphere was great, but parking was a nightmare.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 3, rating: 3, review_text: 'The drinks were okay, but the service could be better.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 3, rating: 5, review_text: 'Empire Groove truly lives up to its name. Loved every second!', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 4, rating: 3, review_text: 'The music was not my style, but my friends loved it.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 4, rating: 4, review_text: 'Great drinks, but the lines to get in were way too long.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 4, rating: 5, review_text: 'Broadway Bash is a hidden gem! The vibe was unbeatable.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 5, rating: 5, review_text: 'Hudson Heat was a fantastic experience. Great location!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 5, rating: 3, review_text: 'The crowd was a bit too rowdy for my liking.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 5, rating: 4, review_text: 'Good drinks and an amazing view of the Hudson River.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 6, rating: 5, review_text: 'Central Rhythm has the best DJs! The dance floor was packed.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 6, rating: 4, review_text: 'Loved the vibe, but it was a bit pricey overall.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 6, rating: 3, review_text: 'It was okay, but I’ve been to better clubs in NYC.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 7, rating: 4, review_text: 'Uptown Funk had an energetic crowd. Drinks were top-notch.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 7, rating: 5, review_text: 'An unforgettable night. The staff were super accommodating.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 7, rating: 3, review_text: 'Good for a casual night out, but not very unique.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 8, rating: 5, review_text: 'Downtown Vibes was incredible. Perfect for a Saturday night!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 8, rating: 4, review_text: 'Great location and good drinks. The music was decent.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 8, rating: 2, review_text: 'Too crowded and loud. Couldn’t find a place to sit.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 9, rating: 4, review_text: 'Times Square Tunes was buzzing! Great spot for tourists.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 9, rating: 3, review_text: 'Nice atmosphere but too expensive for what it offered.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 9, rating: 5, review_text: 'Loved the energy and the live music. A must-visit!', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 10, rating: 5, review_text: 'Harlem Harmony brought the best beats. Amazing crowd!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 10, rating: 4, review_text: 'Good drinks, good crowd, and plenty of seating.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 10, rating: 3, review_text: 'It was okay, but I prefer clubs closer to downtown.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 11, rating: 5, review_text: 'Queens Pulse was an awesome find. A hidden gem!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 11, rating: 4, review_text: 'Great drinks, but parking was a bit of a hassle.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 11, rating: 3, review_text: 'Not bad, but it felt more like a lounge than a club.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 12, rating: 4, review_text: 'Bronx Bounce was a blast. Great place for locals.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 12, rating: 3, review_text: 'Good music, but the drinks weren’t worth the price.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 12, rating: 5, review_text: 'This is my favorite spot in the Bronx. Highly recommend!', createdAt: new Date(), updatedAt: new Date() },

      // Reviews for Los Angeles Clubs
      { user_id: 1, club_id: 13, rating: 5, review_text: 'Hollywood Hype is the place to be! Great music and amazing crowd.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 13, rating: 4, review_text: 'Really enjoyed the ambiance, but it could use more seating.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 13, rating: 3, review_text: 'It was okay, but I expected more from a Hollywood club.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 14, rating: 5, review_text: 'Sunset Groove had amazing cocktails and a breathtaking view.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 14, rating: 3, review_text: 'The view was great, but the music wasn’t my style.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 14, rating: 4, review_text: 'Good overall experience, but the cover charge was steep.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 15, rating: 4, review_text: 'Venice Vibes has a unique beachy charm. Great for a laid-back night.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 15, rating: 5, review_text: 'This is my favorite club in Venice. Always a great time!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 15, rating: 3, review_text: 'Decent spot, but the lines to get in were way too long.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 16, rating: 5, review_text: 'Beverly Beats lived up to its name. Great mix of elegance and fun!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 16, rating: 4, review_text: 'Loved the high-class feel, but it felt a bit too exclusive at times.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 16, rating: 3, review_text: 'It’s nice, but I prefer more casual spots.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 17, rating: 5, review_text: 'Malibu Melodies was absolutely stunning. Best views in LA!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 17, rating: 3, review_text: 'Great location, but the drinks were overpriced.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 17, rating: 4, review_text: 'I had a good time, but it felt more like a lounge than a club.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 18, rating: 4, review_text: 'Downtown LA Nights was electric! The crowd was so lively.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 18, rating: 5, review_text: 'My favorite spot downtown. Always something exciting happening!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 18, rating: 3, review_text: 'Good music, but the crowd wasn’t my vibe.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 19, rating: 5, review_text: 'Echo Park Pulse had incredible energy. Loved the indie music.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 19, rating: 4, review_text: 'Great vibes, but the drinks were a bit lacking in variety.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 19, rating: 3, review_text: 'Decent spot, but nothing too memorable.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 20, rating: 4, review_text: 'Silver Lake Sound was trendy and chic. Great for a quiet night out.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 20, rating: 5, review_text: 'Amazing crowd and drinks. I’m definitely coming back!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 20, rating: 3, review_text: 'It was okay, but I prefer more energetic places.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 21, rating: 5, review_text: 'Santa Monica Sounds was perfect. Ocean views and great music.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 21, rating: 3, review_text: 'Good music, but I wasn’t a fan of the drinks.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 21, rating: 4, review_text: 'Great place to unwind after a day at the beach.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 22, rating: 5, review_text: 'Westwood Wave had the best cocktails in LA! Highly recommend.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 22, rating: 4, review_text: 'Nice spot with a good vibe, but it was a little crowded.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 22, rating: 3, review_text: 'It was okay, but not as impressive as I’d hoped.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 23, rating: 4, review_text: 'Pasadena Pulse was a great find. Very welcoming atmosphere.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 23, rating: 5, review_text: 'Best place in Pasadena! The music was absolutely stellar.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 23, rating: 3, review_text: 'Good spot, but it lacked something special.', createdAt: new Date(), updatedAt: new Date() },

      { user_id: 1, club_id: 24, rating: 5, review_text: 'Culver City Groove was an amazing experience. Great staff and music.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, club_id: 24, rating: 4, review_text: 'Good overall experience, but it felt a bit small.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, club_id: 24, rating: 3, review_text: 'Decent club, but I’ve been to better ones nearby.', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Reviews', reviews);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};

// //Reviews Seed Production
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
//     const reviews = [
//       // Reviews for New York Clubs
//       { user_id: 1, club_id: 1, rating: 5, review_text: 'Amazing vibe! The DJ was incredible, and the staff was super friendly.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 1, rating: 4, review_text: 'Great club, but the drinks were a bit overpriced.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 1, rating: 3, review_text: 'The music was too loud for my taste, but the decor was nice.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 2, rating: 5, review_text: 'Loved the Brooklyn energy! Will definitely come back.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 2, rating: 4, review_text: 'Fantastic drinks, but it was a bit crowded.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 2, rating: 2, review_text: 'Not my scene. It felt too cramped.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 3, rating: 4, review_text: 'The atmosphere was great, but parking was a nightmare.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 3, rating: 3, review_text: 'The drinks were okay, but the service could be better.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 3, rating: 5, review_text: 'Empire Groove truly lives up to its name. Loved every second!', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 4, rating: 3, review_text: 'The music was not my style, but my friends loved it.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 4, rating: 4, review_text: 'Great drinks, but the lines to get in were way too long.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 4, rating: 5, review_text: 'Broadway Bash is a hidden gem! The vibe was unbeatable.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 5, rating: 5, review_text: 'Hudson Heat was a fantastic experience. Great location!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 5, rating: 3, review_text: 'The crowd was a bit too rowdy for my liking.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 5, rating: 4, review_text: 'Good drinks and an amazing view of the Hudson River.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 6, rating: 5, review_text: 'Central Rhythm has the best DJs! The dance floor was packed.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 6, rating: 4, review_text: 'Loved the vibe, but it was a bit pricey overall.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 6, rating: 3, review_text: 'It was okay, but I’ve been to better clubs in NYC.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 7, rating: 4, review_text: 'Uptown Funk had an energetic crowd. Drinks were top-notch.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 7, rating: 5, review_text: 'An unforgettable night. The staff were super accommodating.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 7, rating: 3, review_text: 'Good for a casual night out, but not very unique.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 8, rating: 5, review_text: 'Downtown Vibes was incredible. Perfect for a Saturday night!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 8, rating: 4, review_text: 'Great location and good drinks. The music was decent.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 8, rating: 2, review_text: 'Too crowded and loud. Couldn’t find a place to sit.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 9, rating: 4, review_text: 'Times Square Tunes was buzzing! Great spot for tourists.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 9, rating: 3, review_text: 'Nice atmosphere but too expensive for what it offered.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 9, rating: 5, review_text: 'Loved the energy and the live music. A must-visit!', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 10, rating: 5, review_text: 'Harlem Harmony brought the best beats. Amazing crowd!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 10, rating: 4, review_text: 'Good drinks, good crowd, and plenty of seating.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 10, rating: 3, review_text: 'It was okay, but I prefer clubs closer to downtown.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 11, rating: 5, review_text: 'Queens Pulse was an awesome find. A hidden gem!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 11, rating: 4, review_text: 'Great drinks, but parking was a bit of a hassle.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 11, rating: 3, review_text: 'Not bad, but it felt more like a lounge than a club.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 12, rating: 4, review_text: 'Bronx Bounce was a blast. Great place for locals.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 12, rating: 3, review_text: 'Good music, but the drinks weren’t worth the price.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 12, rating: 5, review_text: 'This is my favorite spot in the Bronx. Highly recommend!', createdAt: new Date(), updatedAt: new Date() },

//       // Reviews for Los Angeles Clubs
//       { user_id: 1, club_id: 13, rating: 5, review_text: 'Hollywood Hype is the place to be! Great music and amazing crowd.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 13, rating: 4, review_text: 'Really enjoyed the ambiance, but it could use more seating.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 13, rating: 3, review_text: 'It was okay, but I expected more from a Hollywood club.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 14, rating: 5, review_text: 'Sunset Groove had amazing cocktails and a breathtaking view.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 14, rating: 3, review_text: 'The view was great, but the music wasn’t my style.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 14, rating: 4, review_text: 'Good overall experience, but the cover charge was steep.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 15, rating: 4, review_text: 'Venice Vibes has a unique beachy charm. Great for a laid-back night.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 15, rating: 5, review_text: 'This is my favorite club in Venice. Always a great time!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 15, rating: 3, review_text: 'Decent spot, but the lines to get in were way too long.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 16, rating: 5, review_text: 'Beverly Beats lived up to its name. Great mix of elegance and fun!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 16, rating: 4, review_text: 'Loved the high-class feel, but it felt a bit too exclusive at times.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 16, rating: 3, review_text: 'It’s nice, but I prefer more casual spots.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 17, rating: 5, review_text: 'Malibu Melodies was absolutely stunning. Best views in LA!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 17, rating: 3, review_text: 'Great location, but the drinks were overpriced.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 17, rating: 4, review_text: 'I had a good time, but it felt more like a lounge than a club.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 18, rating: 4, review_text: 'Downtown LA Nights was electric! The crowd was so lively.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 18, rating: 5, review_text: 'My favorite spot downtown. Always something exciting happening!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 18, rating: 3, review_text: 'Good music, but the crowd wasn’t my vibe.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 19, rating: 5, review_text: 'Echo Park Pulse had incredible energy. Loved the indie music.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 19, rating: 4, review_text: 'Great vibes, but the drinks were a bit lacking in variety.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 19, rating: 3, review_text: 'Decent spot, but nothing too memorable.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 20, rating: 4, review_text: 'Silver Lake Sound was trendy and chic. Great for a quiet night out.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 20, rating: 5, review_text: 'Amazing crowd and drinks. I’m definitely coming back!', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 20, rating: 3, review_text: 'It was okay, but I prefer more energetic places.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 21, rating: 5, review_text: 'Santa Monica Sounds was perfect. Ocean views and great music.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 21, rating: 3, review_text: 'Good music, but I wasn’t a fan of the drinks.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 21, rating: 4, review_text: 'Great place to unwind after a day at the beach.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 22, rating: 5, review_text: 'Westwood Wave had the best cocktails in LA! Highly recommend.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 22, rating: 4, review_text: 'Nice spot with a good vibe, but it was a little crowded.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 22, rating: 3, review_text: 'It was okay, but not as impressive as I’d hoped.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 23, rating: 4, review_text: 'Pasadena Pulse was a great find. Very welcoming atmosphere.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 23, rating: 5, review_text: 'Best place in Pasadena! The music was absolutely stellar.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 23, rating: 3, review_text: 'Good spot, but it lacked something special.', createdAt: new Date(), updatedAt: new Date() },

//       { user_id: 1, club_id: 24, rating: 5, review_text: 'Culver City Groove was an amazing experience. Great staff and music.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 2, club_id: 24, rating: 4, review_text: 'Good overall experience, but it felt a bit small.', createdAt: new Date(), updatedAt: new Date() },
//       { user_id: 3, club_id: 24, rating: 3, review_text: 'Decent club, but I’ve been to better ones nearby.', createdAt: new Date(), updatedAt: new Date() },
//     ];

//     await queryInterface.bulkInsert('Reviews', reviews);
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     options.tableName = 'Reviews';
//     await queryInterface.bulkDelete(options, null, { schema: options.schema });
//   },
// };
