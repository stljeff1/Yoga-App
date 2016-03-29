/*
 * Main AngularJS Web Application
 */


 //define(['angularAMD', 'angular-route', 'controllers/poseListCtrl', 'controllers/singlePoseCtrl'], function(angularAMD) {
	var YogaApp = angular.module('YogaPoseApp', ['ngRoute']);
	/**
	 * Configure the Routes
	 */
	YogaApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			// Home
			.when("/", {templateUrl: "partials/home.html", xcontroller: "PageCtrl"})
			.when("/poses", {templateUrl: "partials/all-poses.html", controller: 'PoseListCtrl'})
			.when("/poses/:sanskritName", {templateUrl: "partials/single-pose.html", controller: 'SinglePoseCtrl'})

			// Pages
			.when("/admin", {templateUrl: "partials/admin.php"})
			.when("/about", {templateUrl: "partials/about.html"})
			.when("/tribute", {templateUrl: "partials/tribute.html"})
			.when("/references", {templateUrl: "partials/references.html"})
			// Blog
			// else 404
			.otherwise("/404", {templateUrl: "partials/404.html"});

			$locationProvider.html5Mode(true);
	}]).run(function($rootScope) {
		$rootScope.pageTitle = "This is the Propifyyourlife Yoga App";
	});


	String.prototype.parseInstagramHashtag = function() {
        return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
            var tag = t.replace("#","")
            return '<a href="https://www.instagram.com/explore/tags/'+tag+'" target="_blank">#'+tag+'</a>';
        });
    };
	/*
	angularAMD.bootstrap(app);
	return app;
});
*/