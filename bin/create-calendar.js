const Promise = require('bluebird')
const path = require('path')
const Sequelize = require('sequelize')
const { split, map } = require('ramda')
const ical = require('ical-generator')

const { database, google: { credentials, sheet } } = require('../config')
const modelPath = '../src/models/GroupBuys.js'
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

sequelize.import(path.join(__dirname, modelPath));

const GroupBuyModel = sequelize.models.groupbuys;

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
    console.log(groupbuys)
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
    return new Promise((resolve, reject) => {
      const calendarFile = path.resolve(__dirname, '../static/calendar.ics')
      console.log('calendar file path:', calendarFile)
      return calendar.save(calendarFile, function(err) {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  })
  .then(() => {
    console.log('calendar created')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  });