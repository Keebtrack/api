module.exports = function CalendarModel(sequelize, DataTypes) {
  const Calendar = sequelize.define('calendar', {
    blob: DataTypes.BLOB
  }, {
    timestamps: false
  });

  return Calendar;
};