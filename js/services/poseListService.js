//define(['app'], function(app) {
angular.module('YogaPoseApp')
	.service('poseListService', ['$http', function($http, $q) {
		var poseData = false;
		return ({
			getPoses: function() {
				var request;

				if(!poseData) {
					request = $http.get('./api/getAllPoses', {cache: true});
					return (request.then(function(response) {
				    		return response.data;
				    	}, function(response) {
				    		if(!angular.isObject(response.data) || !response.data.message)
				    			return ($q.reject("An uknown error has occured"));

				    		return ($q.reject(response.data));
				    	}));		
				}
			},
			loadPoseTypes: function () {
				var request =  $http.get('./api/loadTags?query=poseTypes', {cache: true});
				return (request.then(function(response) {
				    		return response.data;
				    	}, function(response) {
				    		if(!angular.isObject(response.data) || !response.data.message)
				    			return ($q.reject("An uknown error has occured"));

				    		return ($q.reject(response.data));
				    	})
				);
			}
		});
	}])

//})