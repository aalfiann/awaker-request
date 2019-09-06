const ParallelRequest = require('parallel-http-request');
const express = require('express');
const app = express();

var request = new ParallelRequest();
var timestamp = new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19);
var config = require('./config.js');

app.get('/', (req, res) => res.send(new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19)+' : Hello World!'));

app.listen(config.dev.port, () => {
    console.log('Started at '+timestamp);
    console.log(`Awaker is listening on port ${config.dev.port}!`);
    console.log('Will awake for every '+config.dev.refresh+'ms.');
});

setInterval(function(){
    request.clean();
    for(let i in config.dev.website) {
        request.add(config.dev.website[i]);
    }
    request.send(function(response){
        response.forEach(function(v){ delete v.method; delete v.body; });
        console.log('');
        console.log('Refreshed at '+new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19));
        console.log(response);
    })
}, config.dev.refresh);