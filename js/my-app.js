
	var app = angular.module('YogaPoseApp', ['ngRoute']);
	console.log(app);
	/**
	 * Configure the Routes
	 */
	app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
	}]);