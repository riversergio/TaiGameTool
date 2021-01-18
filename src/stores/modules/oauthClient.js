const {google} = require('googleapis');
const fs = require('fs');
// Key
const keyPath = '../client_key.json';
let keys = {"redirect_uris":['']}
if(fs.existsSync(keyPath)){
    keys = require(keyPath);
}
class oauthClient {
    constructor(){
        this.client = new google.auth.OAuth2(
            keys.client_id,
            keys.client_secret,
            keys.redirect_uris[0]
        );
        this.authStatus = null;
        this.scopes = keys.scopes;
        google.options({
            auth: this.client
        });
    }
}

module.exports = new oauthClient;

