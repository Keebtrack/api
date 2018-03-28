const withPagination = require('sequelize-cursor-pagination');

module.exports = function UserModel(sequelize, DataTypes) {
  const GroubBuy = sequelize.define('groupbuys', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.TEXT),
    openDate: DataTypes.DATE,
    closeDate: DataTypes.DATE,
    category: DataTypes.STRING
  }, {
    timestamps: false
  });

  const options = {
    methodName: 'paginate',
    primaryKey: 'id',
  };

  withPagination(options)(GroubBuy);

  return GroubBuy;
};