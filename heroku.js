const ParallelRequest = require('parallel-http-request');
const express = require('express');
const app = express();

var request = new ParallelRequest();
var timestamp = new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19);
var config = require('./config.js');

app.get('/', (req, res) => res.send(new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19)+' : Hello World!'));

app.listen(config.heroku.port, () => {
    console.log('Started at '+timestamp);
    console.log(`Awaker is listening on port ${config.heroku.port}!`);
    console.log('Will awake for every '+config.heroku.refresh+'ms.');
});

setInterval(function(){
    request.clean();
    for(let i in config.heroku.website) {
        request.add(config.heroku.website[i]);
    }
    request.send(function(response){
        response.forEach(function(v){ delete v.method; delete v.body; });
        console.log('');
        console.log('Refreshed at '+new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19));
        console.log(response);
    })
}, config.heroku.refresh);