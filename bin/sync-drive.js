const Sheets = require('node-sheets').default
const Promise = require('bluebird')
const path = require('path')
const Sequelize = require('sequelize')
const { split, map } = require('ramda')

const { database, google } = require('../config')
const { client_email, private_key, private_key_id, sheet } = google

const credentials = {
  client_email,
  private_key,
  private_key_id
}

console.log(credentials)

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
  const sheets = new Sheets(sheet)
  return new Promise(function(resolve, reject) {
    return sheets
      .authorizeJWT(credentials)
      .then(() => sheets.tables(table))
      .then(table => resolve(table.rows))
      .catch(err => reject(err))
  })
}

function clearRow(row) {
  console.log(row)
  return {
    name: row['Group buy name'].value,
    description: row.Description.value,
    username: row.Username.value,
    imgUrl: row['Image url'].value,
    category: row.Category.value,
    url: row['Website url'].value,
    openDate: row['Open date'].value,
    closeDate: row['Close date'].value,
    tags: split(',', row.Tags.value),
    price: row.Price.value,
  }
}

return parseTable(credentials, sheet, 'Group buys')
  .then(function handleRows(rows) {
    console.log(rows)
    return Promise.each(map(clearRow, rows), function store(row) {
      console.log("inserting groupbuy:", row.name)
      return GroupBuyModel.findOne({ where: { name: row.name } })
        .then(function(gb) {
          if (gb) { // update
            return gb.update(row);
          } else { // insert
            return GroupBuyModel.create(row);
          }
        })
    })
  })
  .then(function handleIds(groupbuys) {
    console.log('done inserting', groupbuys)
    process.exit(0)
  })
  .catch(function handleError(err) {
    console.error(err)
    process.exit(1)
  })