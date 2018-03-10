import Sequelize, { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import log from '../../lib/logger';

import { database } from '../../config';

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const sequelize = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  port: database.port,
  dialect: 'postgres',
  logging: data => log.trace('DATABASE:', data),
  define: {
    freezeTableName: true
  },
  operatorsAliases
});

sequelize.authenticate();

let Database = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    Database[model.name] = model;
  });

Object
  .keys(Database)
  .forEach(model => {
    if ('associate' in Database[model]) {
      Database[model].associate(Database);
    }
  });

Database.sequelize = sequelize;
Database.Sequelize = Sequelize;

export default Database;