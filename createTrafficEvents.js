var request = require('request');

var username = 'FIX THIS';
var password = 'FIX THIS';
var tenant_id = 'FIX THIS';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

var options = {
  uri: 'https://automotive.internetofthings.ibmcloud.com/mapinsights/eventservice/event?tenant_id='+tenant_id,
  method: 'POST',
  json: {
    "s_latitude": 6.9072099,
	"s_longitude": 79.8600185,	
	"event_type":"traffic"
  },
  headers: {
	"Authorization":auth,
    "accept": "application/json",
    "content-type": "application/json"
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) 
  }else{
	  console.log("ERROR : " + response.statusCode)
  }
});

/*
use these to create traffic events repeatingly 
[ 6.9032868, 79.8585844 ]
 [ 6.9042227, 79.858406 ]
 [ 6.9054576, 79.858497 ]
 [ 6.9060062, 79.8589998 ]
 [ 6.9066116, 79.8595917 ]
 [ 6.9072099, 79.8600185 ]
*/