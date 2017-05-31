var http = require("https");
var open = require("open");

var trafficData = function(){
	this.add = function(a,b){
		console.log(a+b);
	}
	
	this.getTrafficEvents = function(username,password,tenant_id,mapHostname,min_longitude,min_latitude,max_longitude,max_latitude,event_type){
		var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
		
		var options = {
			"method": "GET",
			"hostname": mapHostname,
			"port": null,
			"path": "/mapinsights/eventservice/event/query?max_latitude="+max_latitude+"&min_longitude="+min_longitude+"&min_latitude="+min_latitude+"&tenant_id="+tenant_id+"&event_type="+event_type+"&max_longitude="+max_longitude,
			"headers": {
				"Authorization":auth,
				"accept": "application/json",
				"content-type": "application/json"
			}
		};
		
		var req = http.request(options, function (res) {
			var chunks = [];
		 
			res.on("data", function (chunk) {
				chunks.push(chunk);
			});
		 
			res.on("end", function () {
				var body = Buffer.concat(chunks);
				//console.log(body.toString());
			
				var xx = JSON.parse(body.toString());
				console.log(xx.length);
			
				var geoCodes = [];
			
				//populate array with geoLocations
				for(var i=0;i<xx.length;i++){
					geoCodes.push(xx[i].s_latitude);
					geoCodes.push(xx[i].s_longitude);
				}
			
				console.log(geoCodes.length);
			
				fs = require('fs');
				fs.writeFile('trafficDataFile.txt', geoCodes, function (err) {
					if (err) 
						return console.log(err);
					console.log('data is wriiten to file');
				});
			});
		});
		 
		req.end();
	};
};

module.exports = new trafficData();


 


//open("http://localhost:8005/trafficMap/trafficMapTest.html","chrome");