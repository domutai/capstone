//CLUBS MODEL DEVELOPMENT
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    main_image_url: {
      type: DataTypes.STRING,
    },
    table_map_url: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Clubs',
    timestamps: true,
  });

  Club.associate = (models) => {
    Club.belongsTo(models.User, { foreignKey: 'owner_id', onDelete: 'CASCADE', as: 'Owner' });
    Club.hasMany(models.Table, { foreignKey: 'club_id', onDelete: 'CASCADE' });
    Club.hasMany(models.Review, { foreignKey: 'club_id', onDelete: 'CASCADE' });
    Club.hasMany(models.ClubImage, { foreignKey: 'club_id', onDelete: 'CASCADE' });
  };

  return Club;
};

//CLUBS MODEL PRODUCTION
// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   const Club = sequelize.define('Club', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     location: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//     },
//     main_image_url: {
//       type: DataTypes.STRING,
//     },
//     table_map_url: {
//       type: DataTypes.STRING,
//     },
//   }, {
//     sequelize,
//     tableName: 'Clubs',
//     schema: 'public',
//     timestamps: true,
//   });

//   Club.associate = (models) => {
//     Club.belongsTo(models.User, { foreignKey: 'owner_id', onDelete: 'CASCADE' });
//     Club.hasMany(models.Table, { foreignKey: 'club_id', onDelete: 'CASCADE' });
//     Club.hasMany(models.Review, { foreignKey: 'club_id', onDelete: 'CASCADE' });
//     Club.hasMany(models.ClubImage, { foreignKey: 'club_id', onDelete: 'CASCADE' });
//   };

//   return Club;
// };