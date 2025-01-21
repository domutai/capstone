// //BOOKING MODEL DEVELOPMENT

// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   const Booking = sequelize.define('Booking', {
//     booking_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     booking_time: {
//       type: DataTypes.TIME,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
//       defaultValue: 'pending',
//     },
//   }, {
//     tableName: 'Bookings',
//     timestamps: true,
//   });

//   Booking.associate = (models) => {
//     Booking.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
//     Booking.belongsTo(models.Table, { foreignKey: 'table_id', onDelete: 'CASCADE' });
//   };

//   return Booking;
// };

//BOOKING MODEL PRODUCTION
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    booking_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    tableName: 'Bookings',
    schema: 'public',
    timestamps: true,
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Booking.belongsTo(models.Table, { foreignKey: 'table_id', onDelete: 'CASCADE' });
  };

  return Booking;
};