/**
 * Main AngularJS Web Application
 */
var app = angular.module('YogaPoseApp', ['ngRoute', 'ngTagsInput']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		// Home
		.when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
		.when("/poses", {templateUrl: "partials/all-poses.html"})
		.when("/poses/:sanskritName", {templateUrl: "partials/single-pose.html"})

		.when("/types", {templateUrl: "partials/all-types.html"})
		.when("/types/:type", {templateUrl: "partials/single-type.html"})
		// Pages
		.when("/admin", {templateUrl: "partials/admin.php"})
		.when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
		.when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
		.when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
		.when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
		.when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
		// Blog
		.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
		.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
		// else 404
		.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});

		$locationProvider.html5Mode(true);
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
	console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
	console.log("Page Controller reporting for duty.");

	// Activates the Carousel
	$('.carousel').carousel({
		interval: 5000
	});

	// Activates Tooltips for Social Links
	$('.tooltip-social').tooltip({
		selector: "a[data-toggle=tooltip]"
	})
});
/*
app.filter('byType', function() {
	return function(input)
})*/

app.controller('PoseListCtrl', ['$scope', 'appService', function ($scope, appService ) {

	$scope.poses = [];
	console.log('PoseListCtrl()');

	$scope.status = "Initiate";

	$scope.activeCats = "";
	
	appService.getPoses().then(function(response) {
		console.log(response);
		$scope.poseList = response.data;
	}, function(response) {
		$scope.status = "Error getting poses";
		console.log('Error fetching poses', response);
	});

	appService.loadCategories().then(function(response) {
		console.log(response);
		$scope.categories = response.data;
	}, function(response) {
		$scope.status = "Error getting cats";
		console.log('Error fetching cats', response);
	});


	$scope.byCategory = function(pose) {
		return $scope.activeCats.replace(/\s*,\s*/g, ',').split(',').every(function(cat) {
			return pose.categories.some(function(objTag){
				
				return objTag.ID.indexOf(cat) !== -1;
				});
			});
		/*
		var matches = [];

		angular.forEach($scope.activeCats, function(value) {
			for(var i = 0; i < pose.categories.length; i++) {
				if(pose.categories == value)
					return true
			}

		})
		return false;*/
	};

	$scope.toggleCategory = function(cat) {
		console.log('toggleCategory()', this, cat);
		if($scope.activeCats.indexOf(cat) >= 0)
			$scope.activeCats = $scope.activeCats.replace(cat+',', '');
		else
			$scope.activeCats += cat + ',';
	}

}]);

app.controller('SinglePoseCtrl', ['$scope', '$routeParams', 'appService', function($scope, $routeParams, appService) {
	console.log('SinglePoseCtrl()');
	var poseName = $routeParams.sanskritName;

	$scope.videoList = [];
	$scope.linkList = [];
	$scope.imgAssetList = [];

	$scope.mediaObj = null;
	
	appService.getPose(poseName).then(function(response) {
		console.log(response);
		var poseID;
		$scope.pose = response.data;
		//$scope.mediaObj = 
		console.log($scope.pose['ID']);
		poseID = $scope.pose['ID'];
		getAssets(poseID);
	}, function(response) {
		$scope.status = "Error getting pose";
		console.log('Error fetching pose: ' + poseName, response);
	});

	$scope.getVideoList = function() { return $scope.videoList; };

	$scope.view = view;

	var getAssets = function(poseID) {
		appService.getAssets(poseID).then(function(response) {
			var data = response.data;
			for(var i = 0; i < data.length; i++) {
				switch(data[i].fk_type) {
					case '1':
						//image
						$scope.imgAssetList.push(data[i])
						break;
					case '2':
						//video
						$scope.videoList.push(data[i]);
						console.log('video added', data[i], $scope.videoList)
						break;
					case '3':
						//external
						$scope.linkList.push(data[i]);
						break;
					default:
				}
				
			}

		}, function(response) {
			$scope.status = "Error getting pose asset";
			console.log('Error getting pose assets', poseID, response);
		});
	}
	var view = function(asset) {
		$scope.mediaObj = asset;
		console.log($scope.mediaObj);
	}
}]);

/*/app.controller('TypeListCtrl', ['$scope', 'appService', function ($scope, appService ) {

	$scope.poses = [];
	console.log('TypeListCtrl()');

	$scope.status = "Initiate Types";

	appService.getTypes().then(function(response) {
		console.log(response);
		$scope.TypeList = response.data;
	}, function(response) {
		$scope.status = "Error getting types";
		console.log('Error fetching types', response);
	});

}]);

app.controller('SingleTypeCtrl', ['$scope', '$routeParams', 'appService', function($scope, $routeParams, appService) {
	console.log('SingleTypeCtrl()');
	var typeName = $routeParams.TypeName;
	appService.getType(typeName).then(function(response) {
		console.log(response);
		$scope.type = response.data;
	}, function(response) {
		$scope.status = "Error getting type";
		console.log('Error fetching pose: ' + typeName, response);
	});


}]);*/

app.controller('addPoseCtrl', ['$scope', '$http', 'appService', function ($scope, $http, appService ) {
	console.log('addPoseCtrl()');

	$scope.defaultPose = {
		"english": '',
		"sanskrit": '',
		"category": [{id: 1, name:'standing'}],
		"image_file": null
	};
	$scope.pose = angular.copy($scope.defaultPose);

	$scope.file = false;

	$scope.categories = ['standing', 'forward bend', 'back bend', 'inversion', 'restorative'];

	$scope.formStatus = "Initialize";

	$scope.serverUpdates = [];


	$scope.loadCategories = function(query) {
		return appService.loadCategories();
	};

	/*$scope.$on('fileSelected', function(e, args) {
		$scope.$apply(function() {
			$scope.files.push(args.file);
		})
	})*/

	$scope.formClick = function() {
		$scope.formStatus = "Ready.";
	}

	$scope.submitForm = function() {

		console.log($scope);
		var file = $scope.poseImage;
		var url = './api/addPose';
		$scope.formStatus = 'Init Save';
		appService.processFileUpload($scope.pose, file, url).then(
			function(data) {
				console.log(data);
				if(data.success) {
					$scope.pose = angular.copy($scope.defaultPose);
					$scope.file = false;
					$scope.addPoseForm.$setPristine(true);
					$scope.formStatus = 'Pose Saved';					
				}
				$scope.serverUpdates.push(data);
			}, function() {
				console.log('an error has occured.')
			} 
		);
	}
}]);


app.controller('addAssetCtrl', ['$scope', '$http', 'appService', function ($scope, $http, appService ) {
	console.log('addAssetCtrl()');

	$scope.defaultAsset = { 
		fkType: null,
		fileUpload: null,
		tagList: [],
		poseList: [],
		url: ""

	};
	$scope.asset = angular.copy($scope.defaultAsset);

	$scope.file = false;

	$scope.formStatus = "Initialize";

	$scope.serverUpdates = [];

	$scope.formErrors = []


	$scope.loadCategories = function(query) {
		return appService.loadCategories();
	};

	$scope.loadTags = function(query) {
		return appService.loadTags();
	};

	$scope.loadPoses = function(query) {
		return appService.loadPoses();
	};

	/*$scope.$on('fileSelected', function(e, args) {
		$scope.$apply(function() {
			$scope.files.push(args.file);
		})
	})*/

	$scope.formClick = function() {
		$scope.formStatus = "Ready.";
	}

	$scope.submitForm = function() {

		console.log($scope);
		var asset = {
			poseList: [],
			tagList: [],
			fk_type: -1
		};
		var file = $scope.fileUpload;
		var url = './api/addAsset';
		var youtube;
		var onSuccess = function(response) {
			/*$scope.asset = angular.copy($scope.defaultPose);
			$scope.file = false;
			$scope.addAssetForm.$setPristine(true);*/
			$scope.formStatus = 'Asset Saved';					

		}

		var onError = function(response) {
			console.log("an erro has occured while saving asset", response);
		}

		for(var i = 0; i < $scope.asset.poseList.length; i++) {
			if($scope.asset.poseList[i].ID != null)
				asset.poseList.push($scope.asset.poseList[i].ID)
		}
		if($scope.asset.tagList) {
			for(var j = 0; j < $scope.asset.tagList.length; j++) {
				var tagName = $scope.asset.tagList[j].tagName;
				console.log(tagName);
				if((typeof tagName) == "string")
					$scope.asset.tagList[j].tagName = tagName.replace('-', ' ');

				asset.tagList.push($scope.asset.tagList[j]);
			}
		}

		if($scope.asset.url != "") {
			youtube = $scope.asset.url.match(/[http(?:s?)?:]?\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?··[\w\?··=]*)?/);
			console.log(youtube);
			if(youtube && youtube.length) {
				asset.fk_type = 2;
				asset.locator = youtube[1];
			}
			else if($scope.asset.url.match(/(ftp|https?):\/\/[^ "]+$/)) {
				asset.fk_type = 3;
				asset.locator = $scope.asset.url;
			}
			else {
				$scope.formErrors.push('Invalid URL.');
				return;
			}

			console.log('Asset:', asset);
			appService.addAsset(asset).then(onSuccess, onError);
		}
		else if(file){
			asset.fk_type = 1;
			appService.uploadAsset(asset, file, './api/uploadAsset').then(onSuccess, onError);
		}
		else {
			$scope.formErrors.push('Form must be submitted with a valid URL or image.');
		}
		
/*
		$scope.formStatus = 'Init Save';
		appService.processForm($scope.asset, file, url).then(
			function(data) {
				console.log(data);
				if(data.success) {
					$scope.asset = angular.copy($scope.defaultAsset);
					$scope.file = false;
					$scope.addAssetForm.$setPristine(true);
					$scope.formStatus = 'Asset Saved';					
				}
				$scope.serverUpdates.push(data);
			}, function() {
				console.log('an error has occured.')
			} 
		);*/
	}
}]);
/*
app.directive('poseListView', function() {
	restrict: 'E',
	scope: {},
	controller: 'PoseListCtrl',
	templateUrl: 'pose-listing.tpl'
})*/

app.directive('fileUpload', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, $el, attrs) {
           var files = $parse(attrs.fileUpload);
           var fileSetter = files.assign;
           //console.log(files, fileSetter,attrs, $scope);

           $scope.$watch(
           	function(scope) { return scope.file;}, 
           	function(newVal, oldVal) {
           		//console.log('watching file upload', newVal);
           		if(!newVal) {
           			//console.log('reset');
           			$el.val(null);
           		}
           	}
           );

           $el.bind('change', function() {
           	$scope.$apply(function() {
           		console.log($el[0].files[0]);
           		fileSetter($scope, $el[0].files[0]);
           		$scope.file = true;
           	})
           });
       
        }
    };
}]);
app.directive('toggleClass', function() {
	return {
		restrict: 'AC',
		link: function($scope, $el, attrs) {
			$el.bind('click', function() {
				$el.toggleClass(attrs.toggleClass);
			})
		}
	}
});

app.directive('yogaVideoList', ['$compile', function($compile) {
	console.log('yogaVideoList()');
	var tpl = "<div class='my-yoga-video-list'><h1>videos here</h1>" +
				"<div class='row' ng-repeat='video in videoList'>" +
					"<div class='col-xs-12'>" +
						"<div class='video-list-container'>Container</div>" +
						//"<div class='yoga-asset video-asset'>{{video.locator}}</div>" +
					"</div>" +
				"</div>" + 
			"</div>";

	return {
		restrict: 'AC',
		replace: true,
		template: tpl,
		scope: {
			videoList: '=',
			view: '&'
		},
		link: function($scope, $el, attrs, $rootScope ) {

			//$el.html()
			//$scope.$apply();
			console.log($scope);
			$scope.$watchCollection($scope.videoList, function(newVal, oldVal) {
				console.log(newVal);
			});

		}
	}
}]);
app.directive('yogaMediaViewer', function($scope) {
	return {
		restrict: 'AC',
		scope: {
			pose: '=',
			mediaObj: '='
		},
		replace: true,
		template: '<div class="yoga-media-viewer"><div class="media-content"><img src="{{pose.image.url}}" style="max-width: 200px;"/></div><div>',
		link: function() {
			//scope.watch mediaObj
		}
	}
});
/*
app.directive('addPoseForm', function() {
	return {
		restrict: 'C',
		link: function($scope, $el, attrs) {

		}
	}
});*/

app.service('appService', ['$http', function ($http, $q) {
	return ({
		processFileUpload: processFileUpload,
		addAsset: addAsset,
		getPoses: getPoses,
		getPose: getPose,
		getAssets: getAssets,
		loadCategories: loadCategories,
		loadPoses: loadPoses,
		loadTags: loadTags
	});

	function getPoses() {
		var request = $http.get('./api/getAllPoses');
		return (request.then(handleSuccess, handleError));		
	}

	function getPose(name) {
		var request, requestObj;
		if(Number.isInteger(name)) {
			requestObj = {'ID': name};
		}
		else
			requestObj = {'sanskritName': name};
		request = $http.get('./api/getPose/'+name);
		return (request.then(handleSuccess, handleError));		
	}

	function getAssets(poseID) {
		var request = $http.get('./api/getAssets/'+poseID);
		return (request.then(handleSuccess, handleError));
	}



	function loadCategories(query) {
		var request =  $http.get('./api/loadCategories');
		return (request.then(handleSuccess, handleError));
	};

	function loadTags(query) {
		var request =  $http.get('./api/loadTags');
		return (request.then(handleSuccess, handleError));
	};

	function loadPoses(query) {
		var request =  $http.get('./api/loadPoses');
		return (request.then(handleSuccess, handleError));
	};

	function addAsset(model) {
		var request = $http({
			method: 'post',
			url: './api/addAsset',
			data: model,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
		});

		return (request.then(handleSuccess, handleError));
	}

	function processFileUpload(model, file, url) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('model', angular.toJson(model));

        var request = $http.post(url, formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });

        return (request.then(handleSuccess, handleError));
    	}

    
    	function handleSuccess(response) {
    		return response.data;
    	}
    	function handleError(response) {
    		if(!angular.isObject(response.data) || !response.data.message)
    			return ($q.reject("An uknown error has occured"));

    		return ($q.reject(response.data));
    	}
}]);
/*
app.factory('poses', ['$resource', function($resource) {
	return $resource('pose/:poseSanskrit',
		{sanskrit: '@poseSanskrit'}, {
			add: {
				method: 'PUT',
				params: { sanskrit: '@poseSanskrit'},
			}
		})
}])
*/