var open = require("open");

var map = require("./routeSearch");
var traffic = require("./trafficData");

var username = 'FIX THIS';
var password = 'FIX THIS';
var tenant_id = "FIX THIS";
var mapHostname ="automotive.internetofthings.ibmcloud.com";

//UPDATE THESE VALUES
var orig_longitude=0;
var orig_latitude=0;

var dest_longitude=0;
var dest_latitude=0;

//get route data
map.getShortestPath(username,password,tenant_id,mapHostname,orig_longitude,orig_latitude,dest_longitude,dest_latitude);

//get traffic data
var event_type = "traffic";
traffic.getTrafficEvents(username,password,tenant_id,mapHostname,orig_longitude,orig_latitude,dest_longitude,dest_latitude,event_type);

//open web browser to show the map
//change the port number as per your installation
open("http://localhost:80/realTimeTrafficData/showTrafficMap.html","chrome");

