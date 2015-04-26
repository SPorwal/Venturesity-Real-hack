var nsApiCalls = {};

nsApiCalls.getFbLogin = function(callback) {
	nsApiCalls.fb = require('facebook');
	nsApiCalls.fb.appid = Alloy.CFG.fbAppId;
	nsApiCalls.fb.permissions = ['user_likes', 'user_interests'];
	nsApiCalls.fb.accessToken = "";
	// nsApiCalls.fb.forceDialogAuth = false;
	// nsApiCalls.fb.initialize();

	// if (!nsApiCalls.fb.loggedIn) {
		nsApiCalls.fb.addEventListener('login', function(e) {
			console.debug("FB LOGIN ", nsApiCalls.fb.loggedIn);

			if (e.success) {

				console.debug(JSON.stringify(e));
				console.debug(JSON.stringify(JSON.parse(e.data)));

				nsApiCalls.fb.accessToken = nsApiCalls.fb.getAccessToken();
				console.debug("accessToken " + nsApiCalls.fb.accessToken);
				var data = JSON.parse(e.data);
				console.debug("DATA " + data);

				nsApiCalls.fb.requestWithGraphPath('me', {
					"fields" : 'likes',
					"redirect" : false
				}, 'GET', function(evt) {
					if (evt.success) {
						var result = JSON.parse(evt.result);
						console.debug("Result " + JSON.stringify(result));
						
						callback(result);

					} else if (evt.error) {
						console.debug(evt.error);
					}
				});

			} else if (e.error) {
				console.debug(e.error);
			} else if (e.cancelled) {
				console.debug("Cancelled");
			} else {
				console.debug(e.error);
			}
		});

		nsApiCalls.fb.authorize();
	// }

};

exports.getFbLogin = nsApiCalls.getFbLogin;

nsApiCalls.getLocalities = function(data, callback) {
	this.onerrorCallback = function(e) {
		console.debug(JSON.stringify(e));
	};

	this.onloadCallback = function(e) {
		console.debug(JSON.stringify(e));
		callback(this.responseText);
	};

	this.serviceCall = function() {

		var url = Alloy.CFG.baseUrl + "/Localities?likes=" + JSON.stringify(data);
		console.debug("URL " + url);
		if (Titanium.Network.online) {
			try {
				var client = Titanium.Network.createHTTPClient({
					onload : this.onloadCallback,
					onerror : this.onerrorCallback,
					// autoRedirect : false,
					timeout : 15000
				});

				if (!OS_ANDROID) {
					client.setCache(true);
				}

				// console.debug(JSON.stringify(postBody));

				client.open("GET", url);
				client.setRequestHeader("Content-Type", "application/json");
				client.send();
			} catch (e) {
				console.debug("Exception : " + JSON.stringify(e));
			}
		} else {
			alert("No network available");
		}
	};
};

exports.getLocalities = nsApiCalls.getLocalities;

