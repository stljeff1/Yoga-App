require.config({

    baseUrl: "js",
    
	// alias libraries paths
    paths: {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min',
        'bootstrap': 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
        'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular',
        'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-route.min',
        'angularAMD': 'angularAMD'        
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
    	  'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'bootstrap': ['jquery']
    },

    // kick start application
    deps: ['app']
}); 


String.prototype.parseInstagramHashtag = function() {
        return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
            var tag = t.replace("#","")
            return '<a href="https://www.instagram.com/explore/tags/'+tag+'" target="_blank">#'+tag+'</a>';
        });
    };