
var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)

app.get('/', function (req, res) {
  // hit AWS API gateway to trigger AWS lambda function that parses JSON
  request('https://rqq0gavu79.execute-api.us-west-2.amazonaws.com/Active/medium', function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      res.send(body); // if no errors, send the body of data back to front end
    }
   });
});


var port = process.env.PORT || 3000;
app.listen(port);
