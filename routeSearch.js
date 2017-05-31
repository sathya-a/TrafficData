var http = require("https");
var open = require("open");

var routeSearch = function(){
	this.getShortestPath = function(username,password,tenant_id,mapHostname,orig_longitude,orig_latitude,dest_longitude,dest_latitude){
		var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
		
		var options = {
					  "method": "GET",
					  "hostname": mapHostname,
					  "port": null,
					  "path": "/mapinsights/mapservice/routesearch?dest_longitude="+dest_longitude+"&orig_latitude="+orig_latitude+"&tenant_id="+tenant_id+"&dest_latitude="+dest_latitude+"&orig_longitude="+orig_longitude,
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
				var results = JSON.parse(body.toString());
				console.log(results.link_shapes.length);
			
				var geoCodes = new Array(results.link_shapes.length);
			
				//create 2D array
				for(var i=0;i<results.link_shapes.length;i++){
					geoCodes[i] = new Array(2);
				}
			
				//populate array with geoLocations
				for(var i=0;i<results.link_shapes.length;i++){
					geoCodes[i][0] = results.link_shapes[i].shape[0].lat;
					geoCodes[i][1] = results.link_shapes[i].shape[0].lon;
				}
			
				//console.log(geoCodes);
			
				fs = require('fs');
				fs.writeFile('mapDataFile.txt', geoCodes, function (err) {
					if (err) 
						return console.log(err);
					console.log('data is written to file');
				});
			});
		});
		req.end();
	}; 
};
 

module.exports = new routeSearch();
