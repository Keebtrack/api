const convict = require('convict');
const schema = require('./schema');

const config = convict(schema);
const env = config.get('env');

const CONFIG_PATH = process.env.CONFIG_PATH;

if (CONFIG_PATH) {
  //Load a custom configuration path.
  config.loadFile(CONFIG_PATH);
} else {
  //Load the environment-specific configuration path.
  config.load(require('./' + env));
}

config.validate();

module.exports = config.get();