const Sheets = require('node-sheets').default
const Promise = require('bluebird')
const path = require('path')
const Sequelize = require('sequelize')
const { split, map } = require('ramda')
const { database, google: { credentials, sheet } } = require('../config')

const modelPath = '../src/models/GroupBuys.js'

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

function parseTable(credentials, sheetId, table) {
  const sheets = new Sheets(sheetId)
  return new Promise(function(resolve, reject) {
    return sheets
      .authorizeJWT(credentials)
      .then(() => sheets.tables(table))
      .then(table => resolve(table.rows))
      .catch(err => reject(err))
  })
}

function clearRow(row) {
  return {
    name: row.Name.value,
    description: row.Description.value,
    imgUrl: row.Image.value,
    openDate: row['Open Date'].value,
    closeDate: row['Close Date'].value,
    tags: split(',', row.Tags.value),
    price: row.Price.value,
  }
}

return parseTable(credentials, sheet, 'Groupbuys')
  .then(function handleRows(rows) {
    return Promise.each(map(clearRow, rows), function store(row) {
      console.log(row)
      console.log(GroupBuyModel)
      return GroupBuyModel.create(row)
    })
  })
  .then(function handleIds(ids) {
    console.log('done inserting', ids)
    process.exit(0)
  })
  .catch(function handleError(err) {
    console.error(err)
    process.exit(1)
  })