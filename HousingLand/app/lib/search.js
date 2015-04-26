var nsSearch = {};

nsSearch.txtFields = [{
	"type" : "food",
	"value" : "Food",
	"details" : "",
	"options" : []
}, {
	"type" : "hospital",
	"value" : "Hospital",
	"details" : "",
	"options" : []
}, {
	"type" : "atm",
	"value" : "ATM",
	"details" : "",
	"options" : []
}, {
	"type" : "shopping_mall",
	"value" : "Shopping Mall",
	"details" : "",
	"options" : []
}, {
	"type" : "store",
	"value" : "Store",
	"details" : "",
	"options" : []
}, {
	"type" : "school",
	"value" : "School",
	"details" : "",
	"options" : []
}, {
	"type" : "liquor_store",
	"value" : "Liquor Store",
	"details" : "",
	"options" : []
}, {
	"type" : "transport",
	"value" : "Transport",
	"details" : "",
	"options" : [{
		"type" : "bus_station",
		"value" : "Bus"
	}, {
		"type" : "airport",
		"value" : "Flight"
	}, {
		"type" : "train_station",
		"value" : "Train"
	}]
}];

nsSearch.init = function(window) {

	// Draw UI

	var vwSearchMain = Titanium.UI.createScrollView({
		layout : "vertical",
		top : 0,
		height : Titanium.UI.SIZE,
		width : Titanium.UI.FILL,
		backgroundColor : "#740BE0",
		scrollType : "vertical",
		id : "vwSearchMain"
	});
	window.add(vwSearchMain);

	var lblValue = Titanium.UI.createLabel({
		left : 10,
		top : 20,
		text : "City",
		type : nsSearch.txtFields.type,
		color : "#ffffff",
		font : {
			fontSize : 20
		}
	});
	vwSearchMain.add(lblValue);

	var tfCityDetails = Titanium.UI.createTextField({
		left : 10,
		top : 10,
		height : 40,
		id : "tfCityDetails",
		width : "80%",
		// type : nsSearch.txtFields.type,
		color : "#ffffff",
		borderColor : "#ffffff",
		font : {
			fontSize : 25
		}
	});

	vwSearchMain.add(tfCityDetails);

	for (var i = 0; i < nsSearch.txtFields.length; i++) {

		var lblValue = Titanium.UI.createLabel({
			left : 10,
			top : 20,
			text : nsSearch.txtFields[i].value,
			type : nsSearch.txtFields.type,
			color : "#ffffff",
			font : {
				fontSize : 20
			}
		});
		vwSearchMain.add(lblValue);

		if (nsSearch.txtFields[i].options.length === 0) {

			var tfDetails = Titanium.UI.createTextField({
				left : 10,
				top : 10,
				height : 40,
				width : "80%",
				id : "tfDetails_" + i,
				type : nsSearch.txtFields.type,
				color : "#ffffff",
				borderColor : "#ffffff",
				font : {
					fontSize : 25
				}
			});

			vwSearchMain.add(tfDetails);
		} else {
			var tfDetails1 = Titanium.UI.createTextField({
				left : 10,
				top : 10,
				height : 40,
				width : "80%",
				id : "tfDetails_" + i,
				type : nsSearch.txtFields.type,
				color : "#ffffff",
				borderColor : "#ffffff",
				font : {
					fontSize : 25
				}
			});

			vwSearchMain.add(tfDetails1);

			var optionPicker = Titanium.UI.createPicker({
				useSpinner : false,
				height : Titanium.UI.SIZE
			});

			var pickerData = [];

			for (var j = 0; j < nsSearch.txtFields[i].options.length; j++) {
				var row = Titanium.UI.createPickerRow({
					title : nsSearch.txtFields[i].options[j].value,
					id : j
				});
				pickerData.push(row);
			}

			optionPicker.selectionIndicator = true;
			optionPicker.add(pickerData);

			optionPicker.addEventListener('change', function(e) {
				// alert(optionPicker.getSelectedRow(0).id);
				optionPicker.setSelectedRow(0, optionPicker.getSelectedRow(0).id, false);
				tfDetails1.setValue(optionPicker.getSelectedRow(0).title);
			});

			vwSearchMain.add(optionPicker);
		}

	}

	var lblSearch = Titanium.UI.createLabel({
		top : 20,
		bottom : 20,
		// right : 10,
		height : 40,
		width : 200,
		borderRadius : 10,
		// borderColor: "red",
		backgroundColor : "#FFDE00",
		text : "Update Interests",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		// width: Titanium.UI.SIZE,
		color : "#ffffff",
		font : {
			fontSize : Alloy.Globals.theme.fonts.size20Fonts,
			fontWeight : "bold"
		}
	});

	var city = "";
	var data = [];

	lblSearch.addEventListener('click', function() {
		// API call

		// callback found data
		// window.remove(vwSearchMain);

		var children = vwSearchMain.getChildren();
		console.debug(JSON.stringify(children));

		for (var i = 0; i < children.length; i++) {
			console.log(children[i].id);

			if (children[i].id === "tfCityDetails") {
				city = children[i].value;
				console.debug("CITY " + city);
				if (city === "") {
					alert("Please enter city details");
					break;
				}
			} else if (city !== "") {
				if (children[i].id === "tfDetails_0" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				} else if (children[i].id === "tfDetails_1" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				} else if (children[i].id === "tfDetails_2" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				} else if (children[i].id === "tfDetails_3" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				} else if (children[i].id === "tfDetails_4" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				} else if (children[i].id === "tfDetails_5" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				} else if (children[i].id === "tfDetails_6" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				} else if (children[i].id === "tfDetails_7" && children[i].value !== "") {
					data.push({
						"type" : nsSearch.txtFields[0].type,
						"details" : children[i].value + " " + city
					});
				}
			}
			
			
		}

		console.debug("DATA " + JSON.stringify(data));
	});

	vwSearchMain.add(lblSearch);

};

exports.init = nsSearch.init;
