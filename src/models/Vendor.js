module.exports = function UserModel(sequelize, DataTypes) {
  const Vendor = sequelize.define('vendors', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    url: DataTypes.STRING(1000),
    logoUrl: DataTypes.STRING(1500),
    description: DataTypes.STRING(3000),
    region: DataTypes.STRING,
  }, {
    timestamps: false
  });

  return Vendor;
};