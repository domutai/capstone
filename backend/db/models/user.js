//USER MODEL DEVELOPMENT

// 'use strict';
// const {
//   Model, Validator
// } = require('sequelize');
// const validator = require('validator');

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.ENUM('user', 'owner'),
//       allowNull: false,
//       defaultValue: 'user',
//     },
//   }, {
//     tableName: 'Users',
//     timestamps: true,
//   });

//   User.associate = (models) => {
//     User.hasMany(models.Club, { foreignKey: 'owner_id', onDelete: 'CASCADE' });
//     User.hasMany(models.Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
//     User.hasMany(models.Booking, { foreignKey: 'user_id', onDelete: 'CASCADE' });
//   };

//   return User;
// };


//USER MODEL PRODUCTION

'use strict';
const {
  Model, Validator
} = require('sequelize');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'owner'),
      allowNull: false,
      defaultValue: 'user',
    },
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Club, { foreignKey: 'owner_id', onDelete: 'CASCADE' });
    User.hasMany(models.Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(models.Booking, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return User;
};