function readDataFile(filePath){ 
	//read data file
	var data;
	var rawFile = new XMLHttpRequest();
    rawFile.open("GET",filePath, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                data = rawFile.responseText;
                //alert(mapData);
            }
        }
    }
    rawFile.send(null);
	return data;
}

function getOSM(){
	var host = "localhost";
	var port = "80";		//change the port number as per your installation
	
	var mapDataFile = "http://"+host+":"+port+"/realTimeTrafficData/mapDataFile.txt";
	var trafficDataFile = "http://"+host+":"+port+"/realTimeTrafficData/trafficDataFile.txt";	
		
	var mapData = readDataFile(mapDataFile);
	var mapArr = mapData.split(',');
	
	var trafficData = readDataFile(trafficDataFile);
	var trafficArr = trafficData.split(','); 
	
	var mapLatLngs = [];
	var latLonPair= [];
	
	//populate lat lon array 
	for(i=0;i<mapArr.length-1;i=i+2){
		latLonPair.push(parseFloat(mapArr[i]));
		latLonPair.push(parseFloat(mapArr[i+1]));
		//push 
		//console.log(latLonPair);
		 mapLatLngs.push(latLonPair);
		//clear
		latLonPair= [];
	}
	
	var eventLatLngs = [];
	//populate lat lon array 
	for(i=0;i<trafficArr.length-1;i=i+2){
		latLonPair.push(parseFloat(trafficArr[i]));
		latLonPair.push(parseFloat(trafficArr[i+1]));
		//push 
		//console.log(latLonPair);
		 eventLatLngs.push(latLonPair);
		//clear
		latLonPair= [];
	}
		
	//set up the map	
	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

	var map = L.map('map').setView(mapLatLngs[0], 15).addLayer(osm);
		
	//route
	var polyline = L.polyline(mapLatLngs, {color: 'red'}).addTo(map);
	
	//traffic
	var polyline2 = L.polyline(eventLatLngs, {color: 'blue'}).addTo(map);

	L.marker(mapLatLngs[mapLatLngs.length-1])
		.addTo(map)
		.bindPopup('Destination')
		.openPopup();
		
	L.marker(mapLatLngs[0])
		.addTo(map)
		.bindPopup('Origin')
		.openPopup();
		
	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);
}