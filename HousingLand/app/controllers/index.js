var nsIndex = {};

nsIndex.locationList = null;

nsIndex.closeWindow = function() {
	var searchOpened = false;
	var searchClose = null;
	var winChildren = $.winIndex.getChildren();
	var len = winChildren.length;
	for (var i = 0; i < len; i++) {
		if (winChildren[i].id === "vwSearchMain") {
			searchClose = winChildren[i];
			searchOpened = true;
			break;
		}
	}
	if (searchOpened) {
		$.winIndex.remove(searchClose);
	} else {
		$.winIndex.close();
	}
};

nsIndex.createList = function() {
	var location = JSON.parse(JSON.stringify(nsIndex.locationList.GetLocalitiesResult));
	var tableData = [];
	var listLength = (nsIndex.locationList.GetLocalitiesResult.length > 20) ? 20 : nsIndex.locationList.GetLocalitiesResult.length;
	for (var i = 0; i < listLength; i++) {
		var row = Titanium.UI.createTableViewRow({
			height : Titanium.UI.SIZE,
			rowIndex : i,
			// hasChild : true
			// borderColor: "red"
		});

		row.addEventListener('click', function(e) {
			var mapApi = require('mapApis');
			mapApi.getCurrentLocation(function(ev) {
				console.debug("index " + JSON.stringify(ev));
				// save source
				Alloy.Globals.getRouteData.source.latitude = ev.latitude;
				Alloy.Globals.getRouteData.source.longitude = ev.longitude;
				Alloy.Globals.getRouteData.source.title = "You are here!";
				Alloy.Globals.getRouteData.source.subtitle = "";
				Alloy.Globals.getRouteData.source.type = "";

				// save destination
				Alloy.Globals.getRouteData.destination.latitude = location[e.source.rowIndex].Lattitude;
				Alloy.Globals.getRouteData.destination.longitude = location[e.source.rowIndex].Longitude;
				Alloy.Globals.getRouteData.destination.title = location[e.source.rowIndex].Name;
				Alloy.Globals.getRouteData.destination.subtitle = location[e.source.rowIndex].PlaceName;
				Alloy.Globals.getRouteData.destination.type = "";

				console.debug(JSON.stringify(e.source.rowIndex, " ", location[e.source.rowIndex]));
				Alloy.createController('mapScreen', location[e.source.rowIndex]).getView().open();
			});

		});

		var vwLocation = Titanium.UI.createView({
			height : 90,
			borderRadius : 10,
			borderColor : "#ffffff",
			width : Titanium.UI.FILL,
			backgroundColor : "#740BE0",
			touchEnabled : false
		});

		var lblLocationName = Titanium.UI.createLabel({
			left : 10,
			text : nsIndex.locationList.GetLocalitiesResult[i].PlaceName,
			color : "#ffffff",
			touchEnabled : false,
			font : {
				fontSize : Alloy.Globals.theme.fonts.size20Fonts,
				// fontWeight : "bold"
			}
		});
		vwLocation.add(lblLocationName);
		row.add(vwLocation);
		tableData.push(row);
	}
	$.tvResultData.setData(tableData);
};

nsIndex.getSearch = function() {
	var getSearch = require('search');
	new getSearch.init($.winIndex);
};

nsIndex.init = function() {
	// CreateList Sections
	// nsIndex.createList(5);

	$.winIndex.open();

	var confirm = Titanium.UI.createAlertDialog({
		title : "Housing",
		message : "Housing wants you to use your data from Social sites but it is not available. Do you want to send mock data to get some results?",
		buttonNames : ['YES', 'NO']
	});

	confirm.addEventListener('click', function(e) {
		if (e.index === 1) {
			nsIndex.getSearch();
		} else {

			var activity = require('activityControl');
			var controller = new activity($.vwMain);
			$.winIndex.add(controller);

			//Service call
			var apicalls = require('apiCalls');
			var getLocalities = new apicalls.getLocalities(Alloy.Globals.mockData, function(responseText) {
				$.winIndex.remove(controller);
				console.debug("response getLocalities ", JSON.parse(responseText));
				nsIndex.locationList = JSON.parse(responseText);
				nsIndex.createList();
			});
			getLocalities.serviceCall();
			// Alloy.createController('mapScreen').getView().open();
		}
	});
	confirm.show();

	/*
	 var fb = require('facebook');

	 if (!fb.loggedIn) {
	 var confirm = Titanium.UI.createAlertDialog({
	 title : "Housing",
	 message : "Housing wants you to login to Facebook.",
	 buttonNames : ['YES', 'NO']
	 });

	 confirm.addEventListener('click', function(e) {
	 if (e.index === 0) {
	 var apicalls = require('apiCalls');
	 new apicalls.getFbLogin(function(result) {

	 var data = [];

	 for (var i = 0; i < result.likes.data.length; i++) {
	 data.push({
	 "type" : result.likes.data[i].category,
	 "details" : result.likes.data[i].name
	 });
	 }
	 var getLocalities = new apicalls.getLocalities(data, function(responseText) {
	 console.debug("response getLocalities ", JSON.parse(responseText));
	 });
	 getLocalities.serviceCall();
	 });
	 confirm.hide();
	 } else {
	 nsIndex.getSearch();
	 }
	 });
	 confirm.show();
	 }*/

	$.winIndex.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsIndex.closeWindow();
	});
};

nsIndex.init();
