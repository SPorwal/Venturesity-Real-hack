var nsMapApis = {};

// Function to get current location
nsMapApis.getCurrentLocation = function(callback) {
	// Titanium.Geolocation.purpose = "Find location of device.";
	Titanium.Geolocation.distanceFilter = 10;
	//Check if Geolocation is enabled
	if (Ti.Geolocation.locationServicesEnabled) {
		if (OS_ANDROID) {
			Titanium.Geolocation.purpose = "Find location of device.";
			Titanium.Geolocation.manualMode = true;
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

			var gpsProvider = Titanium.Geolocation.Android.createLocationProvider({
				name : Titanium.Geolocation.PROVIDER_NETWORK,
				minUpdateTime : 60,
				minUpdateDistance : 100
			});
			Titanium.Geolocation.Android.addLocationProvider(gpsProvider);

			var gpsRule = Titanium.Geolocation.Android.createLocationRule({
				provider : Titanium.Geolocation.PROVIDER_NETWORK,
				// Updates should be accurate to 100m
				accuracy : 100,
				// Updates should be no older than 5m
				maxAge : 300000,
				// But  no more frequent than once per 10 seconds
				minAge : 10000
			});
			Titanium.Geolocation.Android.addLocationRule(gpsRule);

		} else {
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

			Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
			var authCode = Titanium.Geolocation.locationServicesAuthorization;

			if (authCode === Titanium.Geolocation.AUTHORIZATION_ALWAYS) {
				console.debug('AUTHORIZATION_ALWAYS');
				auth = true;
			} else if (authCode === Titanium.Geolocation.AUTHORIZATION_WHEN_IN_USE) {
				console.debug('AUTHORIZATION_WHEN_IN_USE');
				auth = true;
			} else {
				console.debug('NOT AUTHORIZED :(');
				var confirm = Titanium.UI.createAlertDialog({
					title : L("appName"),
					message : L("enableLocation"),
					buttonNames : ['OK']
				});

				confirm.show();

				confirm.addEventListener('click', function(e) {
					console.debug(JSON.stringify(e));
					if (e.index === 0) {
						confirm.hide();
					}
				});
			}
		}
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (Alloy.CFG.isSimulator) {
				e = {
					coords : {
						"latitude" : 53.508565,
						"longitude" : -8.875577
					}
				};
				callback(e.coords);
			} else if (e.error) {
				Ti.API.info("Alloy.Globals.getCurrentLocation(): Error in getting current position.");
				var confirm = Titanium.UI.createAlertDialog({
					title : L("appName"),
					message : L("enableLocation"),
					buttonNames : ['OK']
				});

				confirm.show();

				confirm.addEventListener('click', function(e) {
					console.debug(JSON.stringify(e));
					if (e.index === 0) {
						confirm.hide();
					}
				});
				// alert("Error in getting current location");
			} else {
				Ti.API.info("Alloy.Globals.getCurrentLocation(): Success in reading current position - [" + e.coords.latitude + ", " + e.coords.longitude + "].");
				callback(e.coords);
				// alert("Error in getting current location");
			}
		});
	} else {
		alert("Enable location services");
	}
};

nsMapApis.getStreetView = function(width, heigth, callback) {

	this.onerrorCallback = function(e) {
		console.debug(JSON.stringify(e));
	};

	this.onloadCallback = function(image) {
		// console.debug(JSON.stringify(e));
		callback(image);
	};

	this.serviceCall = function() {

		// var url = "https://maps.googleapis.com/maps/api/streetview?center="+Alloy.Globals.getRouteData.source.latitude+","+Alloy.Globals.getRouteData.source.longitude+"&zoom=11&size="+width+"x"+heigth+"&client=949729979411-4diggf9rugrs7ftgtqlsol6lirene55i.apps.googleusercontent.com&signature=KfvzE1_bUKsHsuR1VbXagPQ2";  //"&key=AIzaSyDzY8c1X4RXJnGhwgJaHhO-uCCvts9gQlE" ;//-15.800513,-47.91378&zoom=11&size=200x200";
		var url = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=12.8928096,77.6097643&fov=90&heading=235&pitch=10&key=AIzaSyCNeU986N4CDXvaYnkC8VE_r1Moza68rZc";
		console.debug("URL " + url);
		if (Titanium.Network.online) {
			try {
				var client = Titanium.Network.createHTTPClient({
					onload : this.onloadCallback,
					onerror : this.onerrorCallback,
					autoRedirect : false,
					timeout : Alloy.Globals.serviceTimeout
				});

				if (!OS_ANDROID) {
					client.setCache(true);
				}

				console.debug(JSON.stringify(postBody));

				client.open("GET", url);
				//client.setRequestHeader("Content-Type", "application/json");
				client.send();
			} catch (e) {
				console.debug("Exception : " + JSON.stringify(e));
			}
		} else {
			alert("No network available");
		}
	};

};

// Nearby search
var flag = false;
nsMapApis.getNearby = function(types, name, callback) {
	if (!flag) {
		
		flag = true;
		var server_key = "AIzaSyBcNrbi7a_rp5WHlcq9J8EFtWOhTvsw3oI";

		this.onerrorCallback = function(e) {
			console.debug(JSON.stringify(e));
		};

		this.onloadCallback = function(e) {
			// console.debug(JSON.stringify(e));
			callback(e);
		};

		this.serviceCall = function() {
			var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+Alloy.Globals.getRouteData.destination.latitude+","+Alloy.Globals.getRouteData.destination.longitude+"&radius=500&types="+types+"&name="+name+"&key="+server_key;
			// var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.9082396,77.60740880000003&radius=500&types=" + types + "&name=" + "&key=" + server_key;
			console.debug("URL " + url);
			if (Titanium.Network.online) {
				try {
					var client = Titanium.Network.createHTTPClient({
						onload : this.onloadCallback,
						onerror : this.onerrorCallback,
						autoRedirect : false,
						timeout : Alloy.Globals.serviceTimeout
					});

					if (!OS_ANDROID) {
						client.setCache(true);
					}

					console.debug(JSON.stringify(postBody));

					client.open("GET", url);
					//client.setRequestHeader("Content-Type", "application/json");
					client.send();
				} catch (e) {
					console.debug("Exception : " + JSON.stringify(e));
				}
			} else {
				alert("No network available");
			}
		};
	}
};

exports.getNearby = nsMapApis.getNearby;
exports.getStreetView = nsMapApis.getStreetView;
exports.getCurrentLocation = nsMapApis.getCurrentLocation;
