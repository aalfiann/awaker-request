# awaker-request
Send request in parallel to awake multiple websites.  

If you want to use Free Heroku plan,  
wihout worry about sleep system in Heroku.

## Usage
1. Download / Clone this repo
2. Go through this directory
3. npm install
4. Create `config.js` file
5. Deploy to heroku
6. Done

### Config.js
Just copy this below and edit the `website` part with yours.
```javascript
var config = {};

/**
 * config.dev is for development test
 */
config.dev = {
    port:3000,                                      // default express server port is 3000
    refresh:10000,                                  // this will refresh for each 10 seconds
    website:[
        'http://127.0.0.1:3000',                    // this is for test to send request to your localhost
        'https://your-website-in.herokuapp.com/'    // your heroku app website
    ]
}

/**
 * config.heroku will be use in heroku
 */
config.heroku = {
    port:process.env.PORT,                          // Detect the Heroku PORT (don't change this)
    refresh:600000,                                 // this will refresh for each 10 minutes
    website:[
        'https://this-awaker-in.herokuapp.com/',    // you must send request into this app to prevent sleep
        'https://your-website-in.herokuapp.com/',   // your heroku app website
        'https://another-website-in.herokuapp.com/' // your another heroku app website if any
    ]
}

module.exports = config;
```

### Development Environment
```bash
$ node dev.js
```

**Note**
- This scripts is run under NodeJS with Express Framework.
- I don't have plan to update any feature, so feel free to `Pull Requests`.