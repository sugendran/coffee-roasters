module.exports = function(grunt) {


	grunt.registerTask('compile', 'Compile geojson data.', function() {
	  var files = grunt.file.expand("data/*.json")
	  var json = files.map(function (filepath) {
		  return grunt.file.readJSON(filepath);
	  }).reduce(function (pv, cv) {
		  pv.features = pv.features.concat(cv.features);
		  return pv;
	  }, {
		    "type": "FeatureCollection",
  			"features": []
	  });
	  grunt.file.write("compiled.json", JSON.stringify(json, null, 2));
	});

  	grunt.registerTask('default', ['compile']);
};