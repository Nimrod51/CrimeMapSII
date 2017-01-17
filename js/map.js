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
	center: [51.962038,7.625937], /*Default location */
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

/*
var overlays = {
	"Density": density
};*/

L.control.layers(baseLayers).addTo(map);
