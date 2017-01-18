var heat;

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
	outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr}),
	satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
	dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
	light = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	satellitestreets = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr});

var map = L.map('mapid', {
	center: [51.513531, -0.089148], /*Default location */
	zoom: 15, /*Default Zoom */
	layers: [light] // Default basemaplayer on startrup, can also give another layer here to show by default)
});

var baseLayers = {
	"Grayscale": grayscale,
	"Streets": streets,
	"Outdoors": outdoors,
	"Satellite": satellite,
	"Satellite Streets": satellitestreets,
	"Dark Map": dark,
	"Light Map": light
};

var wmsLayer = L.tileLayer.wms('http://www.mapping2.cityoflondon.gov.uk/arcgis/services/INSPIRE/MapServer/WMSServer?',{layers: '39'}).addTo(map);

createHeatLayer();

var overlays = {
	"Underground Stations": wmsLayer,
	"Heat Map": heat
};

L.control.layers(baseLayers, overlays).addTo(map);


function LoadGeoJSON(data) {
	var json = null;
	$.ajax({
		async: false,
		global: false,
		url: data,
		dataType: "json",
		success: function (data) {
			var async = false;
			json = data;
		}
	});
	return json;
}

function createHeatLayer () {
var json = LoadGeoJSON("https://data.police.uk/api/crimes-street/all-crime?poly=51.528980,-0.094350:51.511643, -0.115524:51.509700, -0.075766");
var crimes =[];

/*Remove crimes that don't have location data */
//console.log(json.length);
for (i=0; i< json.length; i++) {
	if (json[i].category!="anti-social-behaviour") {
		crimes.push(json[i]); 
	}
}
/*Create Array with locations of crimes only */
//console.log(crimes);
var crimeLocations=[];
for (i=0; i< crimes.length; i++) {
	crimeLocations.push([crimes[i].location.latitude, crimes[i].location.longitude,1])
}
console.log("Total number of points:"+crimeLocations.length);
heat = L.heatLayer(crimeLocations, {radius: 35}).addTo(map);
}