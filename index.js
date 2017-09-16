
var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)

app.get('/', function (req, res) {
  var username = 'graysonhicks'
	var url = "https://medium.com/@"+username+"/latest?format=json";
  // hit AWS API gateway to trigger AWS lambda function that parses JSON
  request({url: url, json: true}, function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      	// We need to pull out the text that comes thru from Medium for JSON hacking
    		jsonBody = JSON.parse(body.replace('])}while(1);</x>', ''));
      body = JSON.parse(body);
      res.send(body); // if no errors, send the body of data back to front end
    }
   });
});
// 
// var request = require("request"); // Include the request lib - run npm install request
// exports.handler = function(event, context, callback) {
// 	callback = context.done;
// 	var data = event.bodyJson || {};
//
// 	// Sets the username - replace username with your Medium Username
//
//
// 	// Make the request to Medium and return the Obj
// 	request({
// 	    url: url,
// 	    json: true
// 	}, function (error, response, body) {
// 	    if (!error && response.statusCode === 200) {
//
// 	        console.log(jsonBody) // Print the json response
// 	        callback(null, jsonBody); // Return the JSON object back to our API call
// 	    }
// 	});
// };



var port = process.env.PORT || 3000;
app.listen(port);
