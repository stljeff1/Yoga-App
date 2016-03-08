/*
 * Main AngularJS Web Application
 */
var app = angular.module('YogaPoseApp', ['ngRoute', 'ngTagsInput']);
String.prototype.parseInstagramHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","")
		return '<a href="https://www.instagram.com/explore/tags/'+tag+'" target="_blank">#'+tag+'</a>';
	});
};

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
		.when("/tribute", {templateUrl: "partials/tribute.html", controller: "PageCtrl"})
		.when("/references", {templateUrl: "partials/references.html", controller: "PageCtrl"})
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

	$scope.activeTags = "";
	
	appService.getPoses().then(function(response) {
		console.log(response);
		$scope.poseList = response.data;
	}, function(response) {
		$scope.status = "Error getting poses";
		console.log('Error fetching poses', response);
	});

	appService.loadTags('poseTypes').then(function(response) {
		console.log(response);
		$scope.tags = response.data;
	}, function(response) {
		$scope.status = "Error getting tags";
		console.log('Error fetching tags', response);
	});


	$scope.filterList = function(pose) {
		return $scope.activeTags.replace(/\s*,\s*/g, ',').split(',').every(function(cat) {
			return pose.tags.some(function(objTag){
				
				return objTag.ID.indexOf(cat) !== -1;
				});
			});

	};

	$scope.toggleTag = function(tag) {
		console.log('toggletagegory()', this, tag);
		if($scope.activeTags.indexOf(tag) >= 0)
			$scope.activeTags = $scope.activeTags.replace(tag+',', '');
		else
			$scope.activeTags += tag + ',';
	}

}]);

app.controller('addPoseCtrl', ['$scope', '$http', 'appService', function ($scope, $http, appService ) {
	console.log('addPoseCtrl()');

	$scope.defaultPose = {
		"english": '',
		"sanskrit": '',
		"tags": [],
		"image_file": null
	};
	$scope.pose = angular.copy($scope.defaultPose);

	$scope.file = false;

	//$scope.categories = ['standing', 'forward bend', 'back bend', 'inversion', 'restorative'];

	$scope.formStatus = "Initialize";

	$scope.serverUpdates = [];


	$scope.loadTags = function(query) {
		console.log(query);
		return appService.loadTags(query);
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
		return appService.loadCategories(query);
	};

	$scope.loadTags = function(query) {
		console.log(query);
		return appService.loadTags(query);
	};

	$scope.loadPoses = function(query) {

		return appService.loadPoses(query);
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
			fk_type: -1,
			notes: null
		};
		var file = $scope.fileUpload;
		var url = './api/addAsset';
		var youtube, instagram;
		var onSuccess = function(response) {
			$scope.asset = angular.copy(asset);
			$scope.file = false;
			$scope.addAssetForm.$setPristine(true);
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

		if($scope.notes != "") 
			asset.notes = $scope.notes;

		if($scope.asset.url != "") {
			youtube = $scope.asset.url.match(/[http(?:s?)?:]?\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?··[\w\?··=]*)?/);
			instagram = $scope.asset.url.match(/www\.?instagram\.com\/p\/(.*)\/$/);
			if(youtube && youtube.length) {
				asset.fk_type = 2;
				asset.locator = youtube[1];
			}
			else if(instagram && instagram.length) {
				asset.fk_type = 4;
				asset.locator = instagram[1];
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

app.directive('singlePoseView', ['$window', function($window)  {
	/*function SinglePoseCtrl($scope, $routeParams, appService) {
		console.log('SinglePoseCtrl()', $scope,$routeParams);
		$scope.poseName = $routeParams.sanskritName;
	}*/


	return {
		restrict: 'AC',
		//controller: ['$scope', '$routeParams', 'appService', SinglePoseCtrl],
		//scope: false,
		//template: '<h1>{{poseName}}</h1>',
		link: function($scope, $el, attrs) {


			$scope.adjustHeight = function() {

				angular.forEach(angular.element('.pose-panel'), function(el) {
					console.log('height!', el.style.height, el);
					el.style.height = '';

					console.log('height again!!!', el.style.height, el);
				});
				var availHeight = angular.element($window).height() - angular.element('.pose-view').offset().top;

				var appHeight = angular.element('footer').offset().top; - angular.element('.pose-view').offset().top;

				var infoHeight = angular.element('.pose-data').height();

				var mediaHeight = angular.element('.pose-media').height();

				var height = appHeight;

				if(infoHeight < mediaHeight) {
					height = availHeight;
				}

				angular.element('.pose-panel').height(availHeight+'px');
				console.log('new height');
			}			
			/*$scope.adjustHeight();
			angular.element($window).bind('resize', $scope.adjustHeight);
			$scope.$on('newMedia', function(obj) { $scope.adjustHeight(); });
			*/
			/*$scope.watch(function(scope) { return scope.viewportStatus; }, function(newVal, oldVal) {
				if(newVal == "Data Loaded") {
				}
			});*/
		}
	}

}]);

app.controller('SinglePoseCtrl', ['$scope', '$routeParams', 'appService', '$q', function($scope, $routeParams, appService, $q) {
	console.log('SinglePoseCtrl()');
	var poseName = $routeParams.sanskritName;
	//$scope.poseName = poseName;
	var camelize = function (str) {
	  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
	    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
	  }).replace(/\s+/g, '');
	}

	$scope.pose = null;
	$scope.viewportStatus = 'Init';

	$scope.videoList = [];
	$scope.videoListStatus = "Videos";

	$scope.linkList = [];
	$scope.LinkListStatus = false;
	$scope.imgAssetList = [];
	$scope.yogagramList = [];
	$scope.instagrams = [];

	$scope.mediaObj = null;

	$scope.myTags = [];
	$scope.loadTags = function(query) {
		console.log(query);
		return appService.loadTags(query);
	};
	$scope.saveTags = function() {
		console.log($scope.myTags);
		appService.saveTags({tags: $scope.myTags, poseID: $scope.pose.ID}).then(function(response) {
			console.log('success saving tags');
		}, function(response) {
			console.log("an error has occured while saving tags", response);
		})
	}

	
	appService.getPose(poseName).then(function(response) {
		var poseID, tagName;
		
		$scope.pose = response.data;
		
		poseID = $scope.pose['ID'];
		tagName = camelize($scope.pose['sanskritName']);


		getAssets(poseID);
		//getInstagrams(tagName);


	}, function(response) {
		$scope.status = "Error getting pose";
		console.log('Error fetching pose: ' + poseName, response);
	});

	$scope.getVideoList = function() { return $scope.videoList; };

	$scope.view = function(asset) {
		$scope.mediaObj = asset;
		return false;
	}

	$scope.getPageInfo = function(asset) {
		var url = asset.locator, myAsset = asset;
		appService.getPageInfo(url).then(function(response) {
			console.log('get page:', response);
			for(var attr in response.data) {
				myAsset[attr] = response.data[attr];
			}
			console.log(myAsset);
			$scope.linkList.push(myAsset);
			$scope.LinkListStatus = false;


		}, function(response) {
			$scope.status = "Error getting page";
			console.log('Error fetching page: ' + url, response);
		});
	}




	var getAssets = function(poseID) {
		$scope.videoListStatus = "Videos Loading...";
		$scope.LinkListStatus = "Links Loading...";
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
						pushVideoItem({locator: data[i].locator, tags: (data[i].tags || []),  ID: data[i].ID, notes: data[i].notes});
						break;
					case '3':
						$scope.getPageInfo(data[i]);
						break;
					case '4':
						pushYogagram({locator: data[i].locator, tags: (data[i].tags || []),  ID: data[i].ID, notes: data[i].notes});
						break;
					default:
						break;
				}

			}

			if(!$scope.videoList.length) {
				$scope.videoListStatus = "";
			}
			$scope.$broadcast('yogaAssetsLoaded');
				

		}, function(response) {
			$scope.status = "Error getting pose asset";
			console.log('Error getting pose assets', poseID, response);
		});

	};	
	var getInstagrams = function(tag) {
		/*var deferred = $q.defer();
		deferred.notify();

		*/
		appService.getInstagrams(tag).then(function(response) {
			var data = response.data;
			console.log(data);
			//$scope.instagrams = data;
		}, function(response) {
			$scope.status = "Error getting pose asset";
			console.log('Error getting pose assets', tag, response);
		});


	};
	var pushVideoItem = function(vidObj) {
		var obj = angular.copy(vidObj);
		var response = appService.getVideoInfo(obj.locator).then(function(response) {
			var data = response.data;

			obj.duration= (function(t) {
				var t = t.replace("PT",'').replace('M',':').replace('S', '');
				var explode = t.split(":");
				if(!explode[1] || explode[1] == "")
					explode[1] = "00";
				return explode[0]+":"+explode[1].replace(/(^|[^0-9])([0-9]{1})($|[^0-9])/, '0$2');
			})(data.items[0].contentDetails.duration);
			obj.title = data.items[0].snippet.title;
			obj.img = data.items[0].snippet.thumbnails.default.url;
			//console.log('pushing', obj);
			obj.asset_type = 2,
			$scope.videoList.push(obj);
		}, function(response) {
			$scope.status = "Error getting video info";
			console.log('Error getting video info', videoID, response);
		});
	}
	var pushYogagram = function(yogObj) {
		var myYogObj = angular.copy(yogObj);
		var response = appService.getSingleInstagram(myYogObj.locator).then(function(response) {

			var obj, user, type, media, date, date_str, caption;
			var data = response.data;
			if(response.meta.code == 200) {
				type = data.type;
				user = {
					name: data.user.username,
					pic: data.user.profile_picture
				};

				media = {
					obj: data[type+'s'],
					link: data.link
				};

				date = new Date(data.created_time * 1000);
				date = date.toString('MMMM d, yyyy');

				caption = data.caption.text.parseInstagramHashtag();

				yogagram = {
					type: type,
					user: user,
					media: media,
					caption: caption,
					myTags: myYogObj.tags,
					notes: (myYogObj.notes == "-1") ? false : myYogObj.notes,
					ID: myYogObj.ID,
					date: date,
					asset_type: 4
				};

				console.log(yogagram);
				$scope.yogagramList.push(yogagram);
			}
			else
				console.log('no instagram data', data);

		}, function(response) {
			$scope.status = "Error getting yogagram";
			console.log('Error getting yogagram', yogObj, response);
		});
	}
	
}]);

app.directive('yogaVideoList', ['$compile', function($compile) {
	console.log('yogaVideoList()');
	var rootTpl = "<div class='video-asset-list'><h3>{{videoListStatus}}</h3><div class='my-yoga-video-list'>" +
				"<div class='yoga-asset video-asset media' ng-repeat='video in videoList' data-target='{{video.locator}}' ng-click='view(video)'>" +
					"<div class='media-left media-image'><img src='{{video.img}}' alt='{{title}}'/></div>" +
					"<div class='media-body'>" + 
						"<h5>{{video.title}}</h5>" +
						"<p><a href='https://youtu.be/{{video.locator}}'><strong>{{video.title}}</strong></a></p>" +
						"<div class='duration'>{{video.duration}}</div>" +
					"</div>" +
				"</div>" +
			"</div></div>";
	return {
		restrict: 'AC',
		replace: true,
		template: rootTpl,
		scope: false,
		link: function($scope, $el, attrs, $rootScope ) {

			var videoTpl = "<div class='yoga-asset video-asset media' ng-repeat='video in videoList' data-target='{{video.locator}}' ng-click='view(video)'>" +
					"<div class='media-left media-image'><img src='{{video.img}}' alt='{{title}}'/></div>" +
					"<div class='media-body'>" + 
						"<h5>{{video.title}}</h5>" +
						"<p><a href='https://youtu.be/{{video.locator}}'><strong>{{video.title}}</strong></a></p>" +
						"<div class='duration'>{{video.duration}}</div>" +
					"</div>" +
				"</div>";
			$scope.$watch(function(scope) { return scope.videoList; }, function(newVal, oldVal) {
				if(newVal.length && false) {
					var newItem = newVal[newVal.length-1];
					var html = videoTpl;

					html = html.replace('%title%', newItem.title, 'g');
					html = html.replace('%img%', newItem.img, 'g');
					html = html.replace('%locator%', newItem.locator, 'g');
					html = html.replace('%duration%', newItem.duration, 'g');

					/*html = angular.element(html).data('video', newItem).on('click', function(e) {
						var data = angular.element(this).data('video');
						console.log('event',this, e)
						$scope.view(data);
					});*/
					$el.append($compile(html)($scope));
				}

			}, true);




		}
	}
}]);

app.directive('yogaInstaFeed', ['$compile', function($compile) {
	console.log('yogaInstafeed()');
	var tpl = "<div class='my-yoga-instafeed'>" +
				"<h3>From Instagram</h3>" +
				"<div class='row'><div class='col-xs-12'><ul class='block-grid-xs-3 block-grid-sm-4'>" +
					"<li ng-repeat='yogagram in yogagramList'>" +
						"<span href='{{yogagram.link}}' ng-click='view(yogagram)' target='_blank'>" +
							"<img class='img-responsive' src='{{yogagram.media.obj.low_resolution.url}}'/>" +
						"</span>" +
					"</li>" +
				"</ul></div></div>" + 

			"</div>";

	return {
		restrict: 'EC',
		replace: true,
		template: tpl,
		scope: false,
		link: function($scope, $el, attrs, $rootScope ) {
//console.log()
			$scope.$watchCollection($scope.yogagramList, function(newVal) {
				console.log('watching yogagramList', newVal);
			});
			$scope.$watch(function() { return $scope.pose; }, function(newVal) {
				if(newVal)
					$el.append("<div class='clearfix' style='margin-top: 10px;'><p><a href='https://www.instagram.com/explore/tags/" + $scope.pose.sanskritName.replace(' ', '') + "' target='_blank'>See Instagram posts tagged as '" + $scope.pose.sanskritName + "'</a></p></div>");
			});
		}
	}
}]);
app.directive('yogaLinkFeed', ['$compile', function($compile) {
	console.log('yogaInstafeed()');
	var tpl = "<div class='link-asset-list'><h3>Other Links</h3><p ng-show='LinkListStatus'>{{LinkListStatus}}</p><div class='yoga-asset link-asset media' ng-repeat='link in linkList' data-target='{{link.locator}}' ng-click='view(link)'>" +
					"<div class='media-left media-image'><img src='{{link.image}}' alt='{{link.title}}'/></div>" +
					"<div class='media-body'>" + 
						"<h5><a href='{{link.url}}' target='_blank'>{{link.title}}</a></h5>" +
						"<p>{{link.description}}<br/><strong>{{link.domain}}</strong></p>" +
					"</div>" +
				"</div>";

	return {
		restrict: 'EC',
		replace: true,
		template: tpl,
		scope: false,
		link: function($scope, $el, attrs, $rootScope ) {
//console.log()

		}
	}
}]);
app.directive('yogaMediaViewer', function() {
	return {
		restrict: 'AC',
		/*scope: {
			pose: '=',
			mediaObj: '='
		},*/
		scope: false,
		replace: true,
		template: '<div class=""><div class="media-content"><img src="{{pose.image.url}}" style="max-width: 200px;"/></div><div>',
		link: function($scope, $el, $attrs) {
			//scope.watch mediaObj

			var contentTpl= {
				youtube: function(obj) {
					console.log(obj);
					var html = '<h4>'+obj.title+'</h4><div class="embed-responsive embed-responsive-4by3"><iframe class="" src="https://www.youtube.com/embed/'+obj.locator+'" frameborder="0" allowfullscreen></iframe></div>';
					if(obj.tags && obj.tags.length) {
						html += '<p>Tags: ';
						for(var i = 0; i < obj.tags.length; i++) {
							html += '<a href="#">' + obj.tags[i].tagName + '</a>';
							if(i < obj.tags.length - 1)
								html += ', ';
						}
						html += '</p>';
					}
					html += '</div>'
					return html;
				},
				instagram: function(obj) {
					var html, user, type, media, date,  caption;

					var titleEL, mediaRow, captionRow;
					type = obj.type;
					user = obj.user,

					media = obj.media,

					date = obj.date

					caption = obj.caption;


					titleEL = "<div class='media'><div class='media-left'><a href='https://www.instagram.com/"+user.name+"'><img class='instagram-profile-pic' src='"+user.pic+"'/></a></div> ";
					titleEL += "<div class='media-body'><h4 class='media-heading'><a href='https://www.instagram.com/"+user.name+"'>"+user.name+"</a></h4>Published:"+date+"</div></div>";

					if(type == "video") {
						console.log('showVideo');
						mediaRow = "<div class='instagram-video'></div>";
					}
					else {
						mediaRow = "<div class='instagram-image'><a href='"+media.link+"' target='_blank'><img class='img-responsive' src='"+media.obj.standard_resolution.url+"'/></a></div>";
					}

					captionRow = "<div class='instagramCaption'><h4>Caption</h4><p>"+caption+"</p></div>";
					if(obj.myTags && obj.myTags.length) {
						captionRow += "<div class='instagramCaption'><h4>Internal Tags:</h4><p>";
						for(var i = 0; i < obj.myTags.length; i++) {
							captionRow += '<a href="#">' + obj.myTags[i].tagName + '</a>';
							if(i < obj.myTags.length - 1)
								captionRow += ', ';
						}
						captionRow += '</p></div>';
					}


					//console.log(titleEL + mediaRow + captionRow);
					return titleEL + mediaRow + captionRow;

					//$el.find('.media-content').html('').append(titleEL).append(mediaRow).append(captionRow);

				}
			}

			$scope.$watch('mediaObj', function(newVal, oldVal) {
				if(newVal) {
					var content = '';
					if((typeof newVal) == "string") {
						if(newVal.match(/\.(?:jpg|gif|png)$/)) {
							content = '<img src="'+newVal+'"/>';
						}
						else if(newVal.length == 11) {
							content = contentTpl.youtube(newVal);
						}
					}
					else if((typeof newVal) == "object") {
						if((newVal.link && newVal.link.indexOf('instagram') > -1) || newVal.asset_type == 4)
							content = contentTpl.instagram(newVal);
						else if(newVal.locator)
							content = contentTpl.youtube(newVal);
					}
					else {
						content = "<a href='"+newVal+"' target='_blank'>"+newVal+"</a>";
					}
					$el.find('.media-content').html(content);
					console.log('showing', newVal);
					$scope.$emit('newMedia', newVal)
				}
			}, true);
		}
	}
});
/*
app.directive('addPoseForm', function() {
	return {
		restrict: 'C',		link: function($scope, $el, attrs) {

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
		loadTags: loadTags,
		getInstagrams: getInstagrams,
		getSingleInstagram: getSingleInstagram,
		getVideoInfo: getVideoInfo,
		getPageInfo: function(url) {

		var request = $http.get('./api/getPageInfo?url='+url);
		return (request.then(handleSuccess, handleError));
		},
		saveTags: saveTags
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
		var request =  $http.get('./api/loadCategories?query='+query);
		return (request.then(handleSuccess, handleError));
	};

	function loadTags(query) {
		var request =  $http.get('./api/loadTags?query='+query);
		return (request.then(handleSuccess, handleError));
	};

	function loadPoses(query) {
		var request =  $http.get('./api/loadPoses?query='+query);
		return (request.then(handleSuccess, handleError));
	};

	
	function getInstagrams(tag) {
		var base = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=';
		var token = '211521125.467ede5.87ba7f407a0c40b191db7899a75b116c';
		var end = "&callback=JSON_CALLBACK";

		var request =  $http.jsonp(base + token + end);
		return (request.then(handleSuccess, handleError));
	};
	function getSingleInstagram(shortcode) {
		var base = 'https://api.instagram.com/v1/media/shortcode/'+shortcode+'?access_token=';
		var token = '211521125.467ede5.87ba7f407a0c40b191db7899a75b116c';
		var end = "&callback=JSON_CALLBACK";
		console.log('getSingleInstagram()', base + token + end)
		var request =  $http.jsonp(base + token + end);
		return (request.then(handleSuccess, handleError));
	};

	function getVideoInfo(videoID) {
		var key = "AIzaSyBVBe0KqROzVUDK31iOC2Tjpc4ViSVeUVI";
		var url = "https://www.googleapis.com/youtube/v3/videos?id="+videoID+"&key="+key+"&part=snippet,contentDetails";

		return $http.get(url);
	}



	function addAsset(model) {
		var request = $http({
			method: 'post',
			url: './api/addAsset',
			data: model,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
		});

		return (request.then(handleSuccess, handleError));
	}

	function saveTags(data) {



		var request = $http({
			method: 'post',
			url: './api/saveTags',
			data: data,
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