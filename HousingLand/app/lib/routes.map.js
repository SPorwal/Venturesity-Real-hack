/***
 * @author: RLTmultimedia
 * URL: https://gist.github.com/RLTmultimedia/10057766
 * Library for returning routes
 * */

var mapModule = require('ti.map');

var Init = function(jsonCoordinates, mapviewElement) {
	try {
		var param = ['destination=' + jsonCoordinates.destination, 'origin=' + jsonCoordinates.origin, 'sensor=true'//, 'key=' + "AIzaSyDNFpndotUr5b2G68toUj-h11VA1Wbi3oM" //Your api google api key
		];
		var url = 'https://maps.googleapis.com/maps/api/directions/json?' + param.join('&');
		console.debug("URL: " + url);
		xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(e) {
			var mapObj = JSON.parse(this.responseText);
			if (mapObj.routes.length > 0) {
				//trasform the point in coordinates
				var points = createRouteData(mapObj);
				console.debug("mapObj "+JSON.stringify(mapObj));
				console.debug("points "+JSON.stringify(points));
				var route = mapModule.createRoute({
					name : '1',
					points : points,
					color : 'red',
					width : 4
				});
				mapviewElement.addRoute(route);
			} else {
				return;
			}
		};
		xhr.open('GET', url);
		xhr.send();
	} catch(e) {
	}
};

var createRouteData = function(json) {

	var step = json.routes[0].overview_polyline.points;
	var intStep = 0,
	    intSteps = step.length,
	    points = [];
	var decodedPolyline,
	    intPoint = 0,
	    intPoints = 0;

	decodedPolyline = decodeLine(step);
	intPoints = decodedPolyline.length;
	for ( intPoint = 0; intPoint < intPoints; intPoint = intPoint + 1) {
		if (decodedPolyline[intPoint] != null) {
			points.push({
				latitude : decodedPolyline[intPoint][0],
				longitude : decodedPolyline[intPoint][1]
			});
		}
	}
	return points;
};

var decodeLine = function(encoded) {
	var len = encoded.length;
	var index = 0;
	var array = [];
	var lat = 0;
	var lng = 0;

	while (index < len) {
		var b;
		var shift = 0;
		var result = 0;
		do {
			b = encoded.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);

		var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
		lat += dlat;

		shift = 0;
		result = 0;
		do {
			b = encoded.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);

		var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
		lng += dlng;

		array.push([lat * 1e-5, lng * 1e-5]);
	}

	return array;
};

module.exports = Init;
