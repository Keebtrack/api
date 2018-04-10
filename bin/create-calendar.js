const Promise = require('bluebird')
const path = require('path')
const Sequelize = require('sequelize')
const { split, map } = require('ramda')
const ical = require('ical-generator')

const { database, google: { credentials, sheet } } = require('../config')

const domain = require('os').hostname();

const sequelize = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  port: database.port,
  dialect: 'postgres',
  define: {
    freezeTableName: true
  }
});

sequelize.authenticate();

sequelize.import(path.join(__dirname, '../src/models/GroupBuys.js'));
sequelize.import(path.join(__dirname, '../src/models/Calendar.js'));

const GroupBuyModel = sequelize.models.groupbuys;
const CalendarModel = sequelize.models.calendar;

CalendarModel.sync({ alter: true });

let calendar = ical({ domain: domain, name: 'Group buys', timezone: 'Europe/Amsterdam' });

calendar.prodId({
  company: 'Keebtrack',
  product: 'Group buy calendar',
  language: 'EN'
});

return GroupBuyModel.findAll()
  .then(function(groupbuys) {
    return groupbuys.map(gb => gb.get({ plain: true }))
  })
  .then(function(groupbuys) {
    return groupbuys.map(groupbuy => {
      calendar.createEvent({
        start: groupbuy.openDate,
        end: groupbuy.closeDate,
        summary: groupbuy.name,
        description: groupbuy.description,
        url: groupbuy.url
      })
    })
  })
  .then(() => {
    console.log('saving calendar')
    console.log(calendar.toString())
    return CalendarModel.create({ blob: calendar.toString() })
  })
  .then(() => {
    console.log('calendar created')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  });