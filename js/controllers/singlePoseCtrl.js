//define(['app', 'directives/yogaInstaFeed', 'directives/yogaLinkFeed', 'directives/yogaVideoList', 'directives/yogaMediaViewer', 'services/singlePoseService'], function() {
angular.module('YogaPoseApp')
	.controller('SinglePoseCtrl', ['$scope', '$routeParams', 'singlePoseService', '$q', '$rootScope', function($scope, $routeParams, appService, $q, $rootScope) {
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
		/*
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
		*/

		
		appService.getPose(poseName).then(function(response) {
			var poseID, tagName;
			
			$scope.pose = response.data;
			
			poseID = $scope.pose['ID'];
			tagName = camelize($scope.pose['sanskritName']);

			getAssets(poseID);

			$rootScope.pageTitle = $scope.pose['sanskritName'] + ' | ' + $scope.pose['englishName'];

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
				for(var attr in response.data) {
					myAsset[attr] = response.data[attr];
				}
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


//})