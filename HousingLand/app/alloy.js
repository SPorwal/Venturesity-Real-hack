// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.locationList = {};

// Get route data
Alloy.Globals.getRouteData = {
	source : {
		latitude : 0,
		longitude : 0,
		title : "",
		subtitle : "",
		type : ""
	},
	destination : {
		latitude : 0,
		longitude : 0,
		title : "",
		subtitle : "",
		type : ""
	}
};

Alloy.Globals.mockData = [{
	"type" : "atm",
	"details" : "hdfc bangalore",
	"name" : "hdfc"
}, {
	"type" : "food",
	"details" : "veg bangalore",
	"name" : "veg"
}, {
	"type" : "hospital",
	"details" : "surgery bangalore",
	"name" : "surgery"
}, {
	"type" : "doctor",
	"details" : "physician bangalore",
	"name" : "physician"
}, {
	"type" : "train_station",
	"details" : "majestic bangalore",
	"name" : "majestic"
}, {
	"type" : "shopping_mall",
	"details" : "mantri square bangalore"
}];

Alloy.Globals.densityFactor = (Titanium.Platform.osname === "android") ? Titanium.Platform.displayCaps.logicalDensityFactor : 1;
Alloy.Globals.platformHeight = 0;
Alloy.Globals.platformWidth = 0;

// Calculating px to dp
Alloy.Globals.pixelToDp = function(px) {
	var pixelToDP;
	pixelToDP = parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160);
	return pixelToDP;
};

Alloy.Globals.init = function() {
	var height = 0;
	var width = 0;

	if (Titanium.Platform.displayCaps.platformHeight > Titanium.Platform.displayCaps.platformWidth) {
		//portrait mode
		height = Titanium.Platform.displayCaps.platformHeight;
		width = Titanium.Platform.displayCaps.platformWidth;
	} else {
		// landscape mode
		height = Titanium.Platform.displayCaps.platformWidth;
		width = Titanium.Platform.displayCaps.platformHeight;
	}

	if (Titanium.Platform.osname === "android") {
		Alloy.Globals.platformHeight = Alloy.Globals.pixelToDp(height);
		Alloy.Globals.platformWidth = Alloy.Globals.pixelToDp(width);
	} else {
		Alloy.Globals.platformHeight = height;
		Alloy.Globals.platformWidth = width;
	}
};
Alloy.Globals.init();

Alloy.Globals.theme = {
	"sizes" : {
		"height40" : Alloy.Globals.platformHeight * 0.0704
	},
	"fonts" : {
		"size40Fonts" : Alloy.Globals.platformHeight * 0.0704,
		"size30Fonts" : Alloy.Globals.platformHeight * 0.0528,
		"size25Fonts" : Alloy.Globals.platformHeight * 0.044,
		"size20Fonts" : Alloy.Globals.platformHeight * 0.0352,
		"size18Fonts" : Alloy.Globals.platformHeight * 0.0317,
		"size15Fonts" : Alloy.Globals.platformHeight * 0.0264,
		"size13Fonts" : Alloy.Globals.platformHeight * 0.0228,
		"size12Fonts" : Alloy.Globals.platformHeight * 0.0211,
	}
}; 