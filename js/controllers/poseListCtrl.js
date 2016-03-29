//define(['app', 'directives/bsSwitch', 'directives/poseListView', 'services/poseListService'], function(app) {
	angular.module('YogaPoseApp').controller('PoseListCtrl', ['$scope', '$location', 'poseListService', '$rootScope', function ($scope, $location, appService, $rootScope ) {

		$rootScope.pageTitle = "List of Poses - #Propfyyourlife yoga app";
		// DATA INIT
		$scope.poses = [];
		console.log('PoseListCtrl()');

		$scope.status = "Initiate";
		$scope.filtering = false;

		$scope.activeTags = "";
		$scope.tags = {};

		$scope.isReady = false;

		$scope.defaultImage = $scope.activePoseImg = 'http://placehold.it/350x350';
		
		// GET ALL POSES
		appService.getPoses().then(function(response) {
			$scope.poseList = response.data;
			$scope.isReady = true;
		}, function(response) {
			$scope.status = "Error getting poses";
			console.log('Error fetching poses', response);
		});

		// LOAD TAGS
		// Specifically, we load the pose types. Every pose belongs to at least one of these Pose Types.
		// The user can filter the pose list with these specific tags
		appService.loadPoseTypes().then(function(response) {
			angular.forEach(response.data, function(data) {
				$scope.tags[data.ID] = {ID: data.ID, tagName: data.tagName, filterOn: false};
			})
		}, function(response) {
			$scope.status = "Error getting tags";
			console.log('Error fetching tags', response);
		});


		// Custom filter to filter the poses by pose type.
		$scope.filterList = function(pose) {
			if(!$scope.filtering) 
				return true;
			else {
				return $scope.activeTags.replace(/\s*,\s*/g, ',').split(',').every(function(cat) {
					return pose.tags.some(function(objTag){
						return objTag.ID.indexOf(cat) !== -1;
					});
				});
			}
		};

		// Manages the ActiveTags (string) scope variable
		$scope.toggleTag = function(tag) {
			if($scope.activeTags.indexOf(tag) >= 0)
				$scope.activeTags = $scope.activeTags.replace(tag+',', '');
			else
				$scope.activeTags += tag + ',';
		}

		// Changes the View.
		$scope.go = function(path) {
			$location.path(path);
		}



	}]);
//});