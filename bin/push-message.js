const { google: {auth} } = require('googleapis');
console.log(auth.JWT)
const SCOPES = []
function getAccessToken() {
  return new Promise(function(resolve, reject) {
    var key = require('./keys.json');
    var jwtClient = new auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      console.log(tokens)
      resolve(tokens.access_token);
    });
  });
}

getAccessToken()
  .then(keys => {
    console.log(keys)
  })