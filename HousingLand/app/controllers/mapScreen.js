var nsMapScreen = {};
nsMapScreen.args = arguments[0];

nsMapScreen.args = {
	"GetLocalitiesResult" : [{
		"Lattitude" : "12.991834",
		"Longitude" : "77.570897",
		"Name" : "Mantri Square",
		"PlaceName" : "Sampige Rd Jai Bheema Nagar Malleshwara Bengaluru "
	}, {
		"Lattitude" : "12.991709",
		"Longitude" : "77.570664",
		"Name" : "Auchan Mantri Square Malleshwaram",
		"PlaceName" : "Sampige Rd Jai Bheema Nagar Malleshwara Bengaluru "
	}, {
		"Lattitude" : "12.991137",
		"Longitude" : "77.571538",
		"Name" : "Cafe Coffee Day - Timeout, Mantri Square",
		"PlaceName" : "Sheshadripuram Bengaluru Bangalore Urban KA "
	}, {
		"Lattitude" : "12.991171",
		"Longitude" : "77.571537",
		"Name" : "Cafe Coffee Day - Mantri Square, Malleswaram",
		"PlaceName" : "Sheshadripuram Bengaluru Bangalore Urban KA "
	}, {
		"Lattitude" : "33.578819",
		"Longitude" : "73.027207",
		"Name" : "Swiss Surgery Square",
		"PlaceName" : "Kamala Abad RWP Rawalpindi Punjab "
	}, {
		"Lattitude" : "12.990489",
		"Longitude" : "77.570745",
		"Name" : "Mantri Square Sampige Road Metro Station",
		"PlaceName" : "Jai Bheema Nagar Sheshadripuram Bengaluru Bangalore Urban "
	}, {
		"Lattitude" : "30.302878",
		"Longitude" : "-97.746776",
		"Name" : "Bailey Square Surgical Center",
		"PlaceName" : "Old West Austin Austin Travis County TX "
	}, {
		"Lattitude" : "42.381071",
		"Longitude" : "-71.098044",
		"Name" : "CHA Union Square Family Health",
		"PlaceName" : "Prospect Hill Somerville Middlesex County MA "
	}, {
		"Lattitude" : "37.78958",
		"Longitude" : "-122.407739",
		"Name" : "Dr. Felicia S. Hall, MD",
		"PlaceName" : "SF San Francisco County CA US "
	}, {
		"Lattitude" : "40.731796",
		"Longitude" : "-73.997422",
		"Name" : "Washington Square Dermatology- Dr. Samer Jaber MD",
		"PlaceName" : "Lower Manhattan Manhattan NY New York County "
	}, {
		"Lattitude" : "39.50952",
		"Longitude" : "-104.760844",
		"Name" : "Parker Square Urgent Care",
		"PlaceName" : "Parker Douglas County CO US "
	}, {
		"Lattitude" : "26.59381",
		"Longitude" : "-81.885416",
		"Name" : "Vein Specialists",
		"PlaceName" : "Fort Myers Lee County FL US "
	}, {
		"Lattitude" : "35.40272",
		"Longitude" : "-80.759012",
		"Name" : "Edison Square Family Medicine",
		"PlaceName" : "Concord 3, Odell Cabarrus County NC "
	}, {
		"Lattitude" : "39.380193",
		"Longitude" : "-76.731097",
		"Name" : "Advanced Radiology",
		"PlaceName" : "Pikesville 3 Baltimore County MD "
	}, {
		"Lattitude" : "38.082377",
		"Longitude" : "-78.470586",
		"Name" : "Albemarle Square Family Health",
		"PlaceName" : "Albemarle Square Charlottesville Rio Albemarle County "
	}, {
		"Lattitude" : "42.338713",
		"Longitude" : "-71.132381",
		"Name" : "Washington Square Dermatology",
		"PlaceName" : "Brookline Norfolk County MA US "
	}, {
		"Lattitude" : "51.514524",
		"Longitude" : "-0.131914",
		"Name" : "Soho Square Surgery",
		"PlaceName" : "Soho London London Gt Lon "
	}, {
		"Lattitude" : "42.395675",
		"Longitude" : "-71.122344",
		"Name" : "Davis Square Family Practice",
		"PlaceName" : "Davis Square Somerville Middlesex County MA "
	}, {
		"Lattitude" : "50.530445",
		"Longitude" : "-3.604868",
		"Name" : "Devon Square Surgery",
		"PlaceName" : "Newton Abbot Newton Abbot Devon GB "
	}, {
		"Lattitude" : "40.243501",
		"Longitude" : "-82.858694",
		"Name" : "Sunbury Square Family Medicine",
		"PlaceName" : "Sunbury Delaware County OH US "
	}]
};

nsMapScreen.mapApi = require('mapApis');
nsMapScreen.mapModule = require('ti.map');

nsMapScreen.closeWindow = function() {
	$.winMapScreen.close();
};

nsMapScreen.createMap = function(e) {
	nsMapScreen.mapView = nsMapScreen.mapModule.createView({
		mapType : nsMapScreen.mapModule.NORMAL_TYPE,
		userLocation : true,
		regionFit : true,
		animate : true,
	});
	console.debug("Hello You!! " + JSON.stringify(Alloy.Globals.getRouteData));

	nsMapScreen.mapView.region = {
		latitude : Alloy.Globals.getRouteData.source.latitude,
		longitude : Alloy.Globals.getRouteData.source.longitude,
		latitudeDelta : 0.05,
		longitudeDelta : 0.05
	};

	// var annotationData = [];
	// var annotations1 = nsMapScreen.mapModule.createAnnotation({
	// latitude : Alloy.Globals.getRouteData.source.latitude,
	// longitude : Alloy.Globals.getRouteData.source.longitude,
	// title : Alloy.Globals.getRouteData.source.title,
	// // subtitle : location[i].county + " - " + location[i].type,
	// rightButton : "",
	// // id : i,
	// // type : location[i].type
	// pincolor : nsMapScreen.mapModule.ANNOTATION_GREEN
	// });
	// annotationData.push(annotations1);
	//
	// nsMapScreen.mapView.setAnnotations(annotationData);

	var annotations = [nsMapScreen.mapModule.createAnnotation({
		latitude : Alloy.Globals.getRouteData.destination.latitude,
		longitude : Alloy.Globals.getRouteData.destination.longitude,
		title : Alloy.Globals.getRouteData.destination.title,
		subtitle : Alloy.Globals.getRouteData.destination.subtitle + " - " + Alloy.Globals.getRouteData.destination.type,
		animate : true,
		pincolor : nsMapScreen.mapModule.ANNOTATION_GREEN,
	}), nsMapScreen.mapModule.createAnnotation({
		latitude : Alloy.Globals.getRouteData.source.latitude,
		longitude : Alloy.Globals.getRouteData.source.longitude,
		title : Alloy.Globals.getRouteData.source.title,
		// subtitle : Alloy.Globals.getRouteData.source.subtitle,
		pincolor : nsMapScreen.mapModule.ANNOTATION_RED,
		animate : true
	})];

	nsMapScreen.mapView.annotations = annotations;
	$.vwCultureView.add(nsMapScreen.mapView);

	var jsonCoordinates = {
		'destination' : Alloy.Globals.getRouteData.destination.latitude + ',' + Alloy.Globals.getRouteData.destination.longitude,
		'origin' : Alloy.Globals.getRouteData.source.latitude + ',' + Alloy.Globals.getRouteData.source.longitude,
	};
	var routes = require("routes.map")(jsonCoordinates, nsMapScreen.mapView);
	console.debug("JSONCoordinates " + JSON.stringify(jsonCoordinates));
	console.debug("Routes " + JSON.stringify(routes));
};

nsMapScreen.changeTabView = function(e) {
	var sourceTab = e.source;

	var types = "",
	    name = "";

	console.debug(sourceTab.id);
	if (sourceTab.id === "vwA") {
		$.vwASelected.selected = true;
		$.vwASelected.setBackgroundColor("#740BE0");

		$.vwBSelected.selected = false;
		$.vwBSelected.setBackgroundColor("#ffffff");

		$.vwCSelected.selected = false;
		$.vwCSelected.setBackgroundColor("#ffffff");

		$.vwDSelected.selected = false;
		$.vwDSelected.setBackgroundColor("#ffffff");

		types = Alloy.Globals.mockData[0].type;
		name = Alloy.Globals.mockData[0].name;

		var nearbyCall = new nsMapScreen.mapApi.getNearby(types, name);
		nearbyCall.serviceCall();

	} else if (sourceTab.id === "vwB") {
		$.vwBSelected.selected = true;
		$.vwBSelected.setBackgroundColor("#740BE0");

		$.vwASelected.selected = false;
		$.vwASelected.setBackgroundColor("#ffffff");

		$.vwCSelected.selected = false;
		$.vwCSelected.setBackgroundColor("#ffffff");

		$.vwDSelected.selected = false;
		$.vwDSelected.setBackgroundColor("#ffffff");

		types = Alloy.Globals.mockData[1].type;
		name = Alloy.Globals.mockData[1].name;

		var nearbyCall = new nsMapScreen.mapApi.getNearby(types, name);
		nearbyCall.serviceCall();

	} else if (sourceTab.id === "vwC") {
		$.vwCSelected.selected = true;
		$.vwCSelected.setBackgroundColor("#740BE0");

		$.vwBSelected.selected = false;
		$.vwBSelected.setBackgroundColor("#ffffff");

		$.vwASelected.selected = false;
		$.vwASelected.setBackgroundColor("#ffffff");

		$.vwDSelected.selected = false;
		$.vwDSelected.setBackgroundColor("#ffffff");

		types = Alloy.Globals.mockData[3].type;
		name = Alloy.Globals.mockData[3].name;

		var nearbyCall = new nsMapScreen.mapApi.getNearby(types, name);
		nearbyCall.serviceCall();

	} else {
		$.vwDSelected.selected = true;
		$.vwDSelected.setBackgroundColor("#740BE0");

		$.vwBSelected.selected = false;
		$.vwBSelected.setBackgroundColor("#ffffff");

		$.vwCSelected.selected = false;
		$.vwCSelected.setBackgroundColor("#ffffff");

		$.vwASelected.selected = false;
		$.vwASelected.setBackgroundColor("#ffffff");

		types = Alloy.Globals.mockData[4].type;
		name = Alloy.Globals.mockData[4].name;

		var nearbyCall = new nsMapScreen.mapApi.getNearby(types, name);
		nearbyCall.serviceCall();
	}

};

nsMapScreen.changeView = function(e, swipe) {
	var sourceTab = (swipe === null || swipe === undefined) ? e.source : e;
	console.debug(sourceTab.id, " ", swipe);

	if (sourceTab.id === "vwCulture") {
		$.vwCultureSelected.selected = true;
		$.vwCultureSelected.setBackgroundColor("#740BE0");
		$.vwCultureView.setVisible(true);

		// $.vwTasteSelected.selected = false;
		// $.vwTasteSelected.setBackgroundColor("#ffffff");
		// $.vwTasteView.setVisible(false);

		$.vwStreetelected.selected = false;
		$.vwStreetelected.setBackgroundColor("#ffffff");
		$.vwStreetView.setVisible(false);

		$.tbGroup2.setHeight(Titanium.UI.SIZE);
		$.tbGroup2.setVisible(true);

	}
	// else if (sourceTab.id === "vwTaste") {
	// $.vwCultureSelected.selected = false;
	// $.vwCultureSelected.setBackgroundColor("#ffffff");
	// $.vwCultureView.setVisible(false);
	//
	// $.vwTasteSelected.selected = true;
	// $.vwTasteSelected.setBackgroundColor("#740BE0");
	// $.vwTasteView.setVisible(true);
	//
	// $.vwStreetelected.selected = false;
	// $.vwStreetelected.setBackgroundColor("#ffffff");
	// $.vwStreetView.setVisible(false);
	// }
	else {
		$.vwCultureSelected.selected = false;
		$.vwCultureSelected.setBackgroundColor("#ffffff");
		$.vwCultureView.setVisible(false);

		// $.vwTasteSelected.selected = false;
		// $.vwTasteSelected.setBackgroundColor("#ffffff");
		// $.vwTasteView.setVisible(false);

		$.vwStreetelected.selected = true;
		$.vwStreetelected.setBackgroundColor("#740BE0");
		$.vwStreetView.setVisible(true);

		$.tbGroup2.setHeight(0);
		$.tbGroup2.setVisible(false);
	}
};

nsMapScreen.init = function() {

	$.winMapScreen.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsMapScreen.closeWindow();
	});

	console.debug("mapscreen " + JSON.stringify(nsMapScreen.args));

	$.ivStreetView.setWidth(Alloy.Globals.platformWidth);
	$.winMapScreen.addEventListener('postlayout', function(e) {
		var vwHeight = $.vwMain.rect.height - $.tabGroup.rect.height;
		console.log("vwHeight " + vwHeight);
		$.ivStreetView.setHeight(vwHeight);

		var api = new nsMapScreen.mapApi.getStreetView(Alloy.Globals.platformWidth, vwHeight, function(streetViewImage) {
			$.ivStreetView.setImage(streetViewImage);
		});
		api.serviceCall();
	});

	var width = Alloy.Globals.platformWidth;
	var tabWidth = width / 2.01;

	$.vwCulture.setWidth(tabWidth);
	$.vwCultureSelected.setWidth(tabWidth);

	// $.vwTaste.setWidth(tabWidth);
	// $.vwTasteSelected.setWidth(tabWidth);

	$.vwStreet.setWidth(tabWidth);
	$.vwStreetelected.setWidth(tabWidth);

	$.vwCultureSelected.setBackgroundColor("#740BE0");
	$.vwCultureView.setVisible(true);

	$.vwASelected.selected = true;
	$.vwASelected.setBackgroundColor("#740BE0");

	// Swipe
	/*
	$.vwCultureView.addEventListener('swipe', function(e) {
	console.debug(e.direction);
	var direction = e.direction;

	if (direction === "left") {
	nsMapScreen.changeView($.vwStreet, "swipe");
	}
	});

	// $.vwTasteView.addEventListener('swipe', function(e) {
	// console.debug(e.direction);
	// var direction = e.direction;
	//
	// if (direction === "left") {
	// nsMapScreen.changeView($.vwStreet, "swipe");
	// } else if (direction === "right") {
	// nsMapScreen.changeView($.vwCulture, "swipe");
	// }
	// });

	$.vwStreetView.addEventListener('swipe', function(e) {
	console.debug(e.direction);
	var direction = e.direction;

	if (direction === "right") {
	nsMapScreen.changeView($.vwCulture, "swipe");
	}
	});
	*/

	//Tab2 Width
	var tabWidth2 = width / 4.01;

	$.vwA.setWidth(tabWidth2);
	$.vwASelected.setWidth(tabWidth2);

	$.vwB.setWidth(tabWidth2);
	$.vwBSelected.setWidth(tabWidth2);

	$.vwC.setWidth(tabWidth2);
	$.vwCSelected.setWidth(tabWidth2);

	$.vwD.setWidth(tabWidth2);
	$.vwDSelected.setWidth(tabWidth2);

	nsMapScreen.createMap();
};

nsMapScreen.init();
