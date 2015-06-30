var GooglePlaces = require('google-places');

var key = process.env.GOOGLE_API_KEY;

if (key == null) {
	console.error("GOOGLE_API_KEY not found in environment");
	process.exit(1);
}

var search = process.argv[process.argv.length - 1];
var places = new GooglePlaces(key);


places.autocomplete({ input: search, types: ['establishment'] }, function (err, response) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	if (response.predictions.length === 0) {
		console.log("No results found");
		process.exit(0);
	}
	places.details({ reference: response.predictions[0].reference }, function (err, response) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var place = response.result;
		var geoJSON = {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					place.geometry.location.lng,
					place.geometry.location.lat
				]
			},
			"properties": {
				"name": place.name
			}
		};
		console.log(JSON.stringify(geoJSON, null, 2));
	});
});