const Sheets = require('node-sheets').default
const Promise = require('bluebird')
const path = require('path')
const Sequelize = require('sequelize')
const { split, map } = require('ramda')

const { database, google } = require('../config')
const { client_email, private_key, private_key_id, sheet } = google

const credentials = {
  client_email,
  private_key: private_key.replace(/\\n/g, '\n'),
  private_key_id
}

const modelPath = '../src/models/Vendor.js'
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

const VendorModel = sequelize.models.vendors;

VendorModel.sync({ alter: true });

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
    name: row['Company name'].value,
    description: row.Description.value,
    logoUrl: row['Logo url'].value,
    region: row.Region.value,
    url: row['Website url'].value,
  }
}

return parseTable(credentials, sheet, 'Vendors')
  .then(function handleRows(rows) {
    console.log(rows)
    return Promise.each(map(clearRow, rows), function store(row) {
      console.log("inserting groupbuy:", row.name)
      return VendorModel.findOne({ where: { name: row.name } })
        .then(function(vendor) {
          if (vendor) { // update
            return vendor.update(row);
          } else { // insert
            return VendorModel.create(row);
          }
        })
    })
  })
  .then(function handleIds(vendors) {
    console.log('done inserting', vendors)
    process.exit(0)
  })
  .catch(function handleError(err) {
    console.error(err)
    process.exit(1)
  })