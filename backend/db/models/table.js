// //TABLE MODEL DEVELOPMENT

// module.exports = (sequelize, DataTypes) => {
//     const Table = sequelize.define('Table', {
//       table_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       price: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       capacity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       image_url: {
//         type: DataTypes.STRING,
//       },
//     }, {
//       tableName: 'Tables',
//       timestamps: true,
//     });
  
//     Table.associate = (models) => {
//       Table.belongsTo(models.Club, { foreignKey: 'club_id', onDelete: 'CASCADE' });
//       Table.hasMany(models.Booking, { foreignKey: 'table_id', onDelete: 'CASCADE' });
//     };
  
//     return Table;
//   };

 // TABLE MODEL PRODUCTION

module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    table_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: 'Tables',
    timestamps: true,
    schema: 'public',
  });

  Table.associate = (models) => {
    Table.belongsTo(models.Club, { foreignKey: 'club_id', onDelete: 'CASCADE' });
    Table.hasMany(models.Booking, { foreignKey: 'table_id', onDelete: 'CASCADE' });
  };

  return Table;
};
  