//Tables Seed Devlopment
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
    const tables = [
      // Tables for Club 1: Manhattan Nights
      {
        club_id: 1,
        table_name: 'Skyline View Table',
        price: 750.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club1-skyline-view-table.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 1,
        table_name: 'Penthouse Lounge Table',
        price: 500.00,
        capacity: 4,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club1-penthouse-lounge-table.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 1,
        table_name: 'Manhattan VIP Suite',
        price: 1200.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club1-vip-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 2: Brooklyn Beats
      {
        club_id: 2,
        table_name: 'Brooklyn Bridge Table',
        price: 600.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club2-brooklyn-bridge-table.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 2,
        table_name: 'Bass Drop Lounge',
        price: 400.00,
        capacity: 4,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club2-bass-drop-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 2,
        table_name: 'VIP Rave Zone',
        price: 950.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club2-vip-rave-zone.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 3: Empire Groove
      {
        club_id: 3,
        table_name: 'Groove Master Table',
        price: 550.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club3-groove-master-table.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 3,
        table_name: 'Disco Fever Spot',
        price: 350.00,
        capacity: 4,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club3-disco-fever-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 3,
        table_name: 'Empire Elite Suite',
        price: 1100.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club3-empire-elite-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 4: Broadway Bash
      {
        club_id: 4,
        table_name: 'Broadway Spotlight Table',
        price: 700.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club4-broadway-spotlight-table.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 4,
        table_name: 'Center Stage Lounge',
        price: 450.00,
        capacity: 4,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club4-center-stage-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 4,
        table_name: 'Theatrical VIP Suite',
        price: 1000.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club4-vip-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 5: Hudson Heat
      {
        club_id: 5,
        table_name: 'Riverfront Lounge',
        price: 550.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club5-riverfront-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 5,
        table_name: 'Hudson Night Spot',
        price: 400.00,
        capacity: 4,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club5-hudson-night-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 5,
        table_name: 'VIP Waterfront Table',
        price: 1100.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club5-vip-waterfront-table.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Tables for Club 6: Central Rhythm
      {
        club_id: 6,
        table_name: 'Heartbeat Lounge Table',
        price: 650.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club6-heartbeat-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 6,
        table_name: 'Pulse VIP Table',
        price: 950.00,
        capacity: 7,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club6-pulse-vip.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 6,
        table_name: 'Central Exclusive Suite',
        price: 1250.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club6-central-exclusive-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 7: Uptown Funk
      {
        club_id: 7,
        table_name: 'Retro Vibes Table',
        price: 550.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club7-retro-vibes.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 7,
        table_name: 'Funky Groove Lounge',
        price: 750.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club7-funky-groove.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 7,
        table_name: 'VIP Funk Zone',
        price: 1100.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club7-vip-funk-zone.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 8: Downtown Vibes
      {
        club_id: 8,
        table_name: 'Cityscape Lounge',
        price: 600.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club8-cityscape-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 8,
        table_name: 'Urban Elite Table',
        price: 850.00,
        capacity: 7,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club8-urban-elite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 8,
        table_name: 'VIP Skyline Suite',
        price: 1300.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club8-vip-skyline-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 9: Times Square Tunes
      {
        club_id: 9,
        table_name: 'Broadway Balcony Table',
        price: 700.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club9-broadway-balcony.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 9,
        table_name: 'Tunes VIP Spot',
        price: 950.00,
        capacity: 7,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club9-tunes-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 9,
        table_name: 'VIP Harmony Lounge',
        price: 1400.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club9-vip-harmony-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 10: Harlem Harmony
      {
        club_id: 10,
        table_name: 'Jazz Vibes Table',
        price: 600.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club10-jazz-vibes.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 10,
        table_name: 'Harlem Exclusive Lounge',
        price: 900.00,
        capacity: 7,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club10-harlem-exclusive.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 10,
        table_name: 'VIP Melody Suite',
        price: 1350.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club10-vip-melody-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 11: Queens Pulse
      {
        club_id: 11,
        table_name: 'Queens Crown Lounge',
        price: 550.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club11-queens-crown-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 11,
        table_name: 'Pulse VIP Spot',
        price: 850.00,
        capacity: 7,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club11-pulse-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 11,
        table_name: 'VIP Royal Suite',
        price: 1300.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club11-vip-royal-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 12: Bronx Bounce
      {
        club_id: 12,
        table_name: 'Bounce Lounge Table',
        price: 500.00,
        capacity: 4,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club12-bounce-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 12,
        table_name: 'Bronx Energy Spot',
        price: 800.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club12-energy-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 12,
        table_name: 'VIP Bounce Suite',
        price: 1200.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club12-vip-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Tables for Club 13: Hollywood Hype
      {
        club_id: 13,
        table_name: 'Red Carpet Lounge',
        price: 900.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club13-red-carpet-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 13,
        table_name: 'Spotlight VIP Table',
        price: 1200.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club13-spotlight-vip.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 13,
        table_name: 'Director’s Exclusive Suite',
        price: 1500.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club13-directors-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 14: Sunset Groove
      {
        club_id: 14,
        table_name: 'Ocean View Lounge',
        price: 850.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club14-ocean-view-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 14,
        table_name: 'Sunset VIP Spot',
        price: 1100.00,
        capacity: 7,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club14-sunset-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 14,
        table_name: 'Golden Hour Exclusive',
        price: 1450.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club14-golden-hour-exclusive.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 15: Venice Vibes
      {
        club_id: 15,
        table_name: 'Beachfront Lounge Table',
        price: 700.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club15-beachfront-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 15,
        table_name: 'Wave Rider VIP',
        price: 1000.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club15-wave-rider-vip.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 15,
        table_name: 'Coastal Elite Suite',
        price: 1300.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club15-coastal-elite-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 16: Beverly Beats
      {
        club_id: 16,
        table_name: 'Luxury Lounge Table',
        price: 950.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club16-luxury-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 16,
        table_name: 'Platinum VIP Spot',
        price: 1300.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club16-platinum-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 16,
        table_name: 'Beverly Elite Suite',
        price: 1700.00,
        capacity: 12,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club16-beverly-elite-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 17: Malibu Melodies
      {
        club_id: 17,
        table_name: 'Seaside Serenity Table',
        price: 800.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club17-seaside-serenity.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 17,
        table_name: 'Harmony VIP Spot',
        price: 1150.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club17-harmony-vip.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 17,
        table_name: 'Oceanfront Exclusive Suite',
        price: 1550.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club17-oceanfront-exclusive-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Tables for Club 18: Downtown LA Nights
      {
        club_id: 18,
        table_name: 'City Lights Lounge',
        price: 850.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club18-city-lights-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 18,
        table_name: 'Urban VIP Table',
        price: 1200.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club18-urban-vip-table.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 18,
        table_name: 'Skyline Elite Suite',
        price: 1600.00,
        capacity: 12,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club18-skyline-elite-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 19: Echo Park Pulse
      {
        club_id: 19,
        table_name: 'Lakeside Lounge Table',
        price: 750.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club19-lakeside-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 19,
        table_name: 'Rhythm VIP Spot',
        price: 1100.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club19-rhythm-vip.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 19,
        table_name: 'Pulse Exclusive Suite',
        price: 1500.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club19-pulse-exclusive-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 20: Silver Lake Sound
      {
        club_id: 20,
        table_name: 'Chic Lounge Table',
        price: 800.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club20-chic-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 20,
        table_name: 'Trendy VIP Spot',
        price: 1250.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club20-trendy-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 20,
        table_name: 'Exclusive Sound Suite',
        price: 1650.00,
        capacity: 12,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club20-exclusive-sound-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 21: Santa Monica Sounds
      {
        club_id: 21,
        table_name: 'Ocean Breeze Lounge',
        price: 850.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club21-ocean-breeze-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 21,
        table_name: 'Beachside VIP Table',
        price: 1300.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club21-beachside-vip.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 21,
        table_name: 'Seaside Exclusive Suite',
        price: 1700.00,
        capacity: 12,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club21-seaside-exclusive-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 22: Westwood Wave
      {
        club_id: 22,
        table_name: 'Wavefront Lounge Table',
        price: 750.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club22-wavefront-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 22,
        table_name: 'Tidal VIP Spot',
        price: 1200.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club22-tidal-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 22,
        table_name: 'Westwood Exclusive Suite',
        price: 1600.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club22-exclusive-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 23: Pasadena Pulse
      {
        club_id: 23,
        table_name: 'Rose Garden Lounge',
        price: 700.00,
        capacity: 5,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club23-rose-garden-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 23,
        table_name: 'Pasadena VIP Spot',
        price: 1150.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club23-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 23,
        table_name: 'Crown City Exclusive',
        price: 1550.00,
        capacity: 10,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club23-crown-city-exclusive.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tables for Club 24: Culver City Groove
      {
        club_id: 24,
        table_name: 'Groove Lounge Table',
        price: 750.00,
        capacity: 6,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club24-groove-lounge.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 24,
        table_name: 'Rhythm VIP Spot',
        price: 1200.00,
        capacity: 8,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club24-rhythm-vip-spot.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        club_id: 24,
        table_name: 'Exclusive Groove Suite',
        price: 1650.00,
        capacity: 12,
        image_url: 'https://your-bucket-name.s3.amazonaws.com/club24-exclusive-groove-suite.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Tables', tables);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tables', null, {});
  },
};
