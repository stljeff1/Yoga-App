
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
