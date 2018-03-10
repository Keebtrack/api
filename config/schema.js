module.exports = {
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'acceptance', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  logger: {
    level: {
      doc: 'The log level to output.',
      format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
      default: 'trace',
      env: 'APP_LOG_LEVEL'
    },
    name: {
      doc: 'Logger name',
      default: 'TODO-APP',
      env: 'APP_LOGGER_NAME'
    }
  },
  google: {
    credentials: {
      doc: 'google sheets credentials',
      default: {},
      format: Object,
      env: 'GOOGLE_CREDENTIALS'
    },
    sheet: {
      doc: 'sheet id to parse',
      format: String,
      default: '',
      env: 'GOOGLE_SHEET_ID'
    },
  },
  database: {
    host: {
      doc: 'database host',
      default: 'localhost',
      format: String,
      env: 'DATABASE_HOST'
    },
    port: {
      doc: 'database port',
      default: 5432,
      format: 'int',
      env: 'DATABASE_PORT'
    },
    name: {
      doc: 'database name',
      default: 'keebtrack',
      format: String,
      env: 'DATBASE_NAME'
    },
    username: {
      doc: 'database username',
      default: 'kfoppen',
      format: String,
      env: 'DATBASE_USERNAME'
    },
    password: {
      doc: 'database password',
      default: '',
      format: String,
      env: 'DATABASE_PASSWORD'
    }
  },
  http: {
    port: {
      doc: 'The port the application runs at.',
      format: 'int',
      default: 9094,
      env: 'PORT'
    }
  }
};