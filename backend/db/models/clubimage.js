// models/ClubImage.js
// DEVELOPMENT

// module.exports = (sequelize, DataTypes) => {
//   const ClubImage = sequelize.define('ClubImage', {
//     image_url: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   }, {
//     tableName: 'ClubImages',
//     timestamps: true,
//   });

//   ClubImage.associate = (models) => {
//     ClubImage.belongsTo(models.Club, { foreignKey: 'club_id', onDelete: 'CASCADE' });
//   };

//   return ClubImage;
// };
 

// PRODUCTION
module.exports = (sequelize, DataTypes) => {
  const ClubImage = sequelize.define('ClubImage', {
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'ClubImages',
    timestamps: true,
    schema: 'public',
  });

  ClubImage.associate = (models) => {
    ClubImage.belongsTo(models.Club, { foreignKey: 'club_id', onDelete: 'CASCADE' });
  };

  return ClubImage;
};