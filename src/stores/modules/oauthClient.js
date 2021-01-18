const {google} = require('googleapis');
const fs = require('fs');
// Key
const keyPath = '../client_key.json';
let keys = {"redirect_uris":['']}
if(fs.existsSync(keyPath)){
    keys = require(keyPath);
}
const oauthClient = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0]
);

google.options({
    auth: oauthClient
});

module.exports = oauthClient;

