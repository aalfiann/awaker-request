var config = {};

/**
 * config.dev is for development test
 */
config.dev = {
    port:3000,
    refresh:10000,
    website:[
        'http://127.0.0.1:3000',
        'https://private-awaker.herokuapp.com/'
    ]
}

/**
 * config.heroku will be use in heroku
 */
config.heroku = {
    port:process.env.PORT,
    refresh:600000,
    website:[
        'https://private-awaker.herokuapp.com/',
        'https://thawing-escarpment-54169.herokuapp.com/'
    ]
}

module.exports = config;