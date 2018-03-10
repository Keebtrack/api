// NOT USED RIGHT NOW

const fs = require('fs');
const path = require('path');

function flatten(array) {
  return array.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

function walkFiles(path) {
  const files =  fs.readdirSync(path)
    .map(file => `${path}/${file}`)
    .map(file => fs.statSync(file).isDirectory() ? walkFiles(file) : file)
    
    return flatten(files)
}

function loadSchemas(folder) {
  const DIRECTORY = path.dirname(module.parent.filename)
  const files = walkFiles(DIRECTORY).filter(file => !file.includes('index.js'))

  const schemas = files
    .filter(file => file.includes('.graphql') || file.includes('.gql'))
    .map(file => fs.readFileSync(file).toString())
    .concat()

  const resolvers = files
    .filter(file => file.includes('.js'))
    .map(file => require(file).default)
    .concat()

  return { schemas: schemas, resolvers: resolvers }
}

module.exports = loadSchemas