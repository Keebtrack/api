const bunyan = require('bunyan');

const { logger: { level, name } } = require('../config');

module.exports = bunyan.createLogger({ name, level });