// // models/Review.js
// //DEVELOPMENT

// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   const Review = sequelize.define('Review', {
//     rating: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: 1,
//         max: 5,
//       },
//     },
//     review_text: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   }, {
//     tableName: 'Reviews',
//     timestamps: true,
//   });

//   Review.associate = (models) => {
//     Review.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
//     Review.belongsTo(models.Club, { foreignKey: 'club_id', onDelete: 'CASCADE' });
//   };

//   return Review;
// };

// PRODUCTION

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Reviews',
    timestamps: true,
    schema: 'public',
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Review.belongsTo(models.Club, { foreignKey: 'club_id', onDelete: 'CASCADE' });
  };

  return Review;
};