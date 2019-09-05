const express = require('express');
const app = express();
const ParallelRequest = require('parallel-http-request');
var request = new ParallelRequest();
var timestamp = new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19);

app.get('/', (req, res) => res.send(new Date().toISOString().replace('T',' ').replace('Z','').substr(0,19)+' : Hello World!'));


/**
 * Configuration
 */
const port = 3000;              // dev mode
// const port = process.env.PORT;  //heroku
const awake = 10000;            // awake in miliseconds
const website = [
    'http://127.0.0.1:3000',
    'https://thawing-escarpment-54169.herokuapp.com/'
];


/**
 * RUN
 */
app.listen(port, () => {
    console.log('Started at '+timestamp);
    console.log(`Awaker is listening on port ${port}!`);
    console.log('Will awake for every '+awake+'ms.');
});

setInterval(function(){
    request.clean();
    for(let i in website) {
        request.add(website[i]);
    }
    request.send(function(response){
        response.forEach(function(v){ delete v.method;delete v.body; });
        console.log(response);
    })
},awake);