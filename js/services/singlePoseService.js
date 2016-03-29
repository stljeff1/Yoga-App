//define(['app'], function(app) {

angular.module('YogaPoseApp')
	.service('singlePoseService', ['$http', function ($http, $q) {

	return ({
		getPose: getPose,
		getAssets: getAssets,
		getInstagrams: getInstagrams,
		getSingleInstagram: getSingleInstagram,
		getVideoInfo: getVideoInfo,
		getPageInfo: function(url) {

		var request = $http.get('./api/getPageInfo?url='+url, {cache: true});
		return (request.then(handleSuccess, handleError));
		},
	});


	function getPose(name) {
		var request, requestObj;
		if(Number.isInteger(name)) {
			requestObj = {'ID': name};
		}
		else
			requestObj = {'sanskritName': name};
		request = $http.get('./api/getPose/'+name, {cache: true});
		return (request.then(handleSuccess, handleError));		
	}

	function getAssets(poseID) {
		var request = $http.get('./api/getAssets/'+poseID, {cache: true});
		return (request.then(handleSuccess, handleError));
	}


	
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
		var request =  $http.jsonp(base + token + end);
		return (request.then(handleSuccess, handleError));
	};

	function getVideoInfo(videoID) {
		var key = "AIzaSyBVBe0KqROzVUDK31iOC2Tjpc4ViSVeUVI";
		var url = "https://www.googleapis.com/youtube/v3/videos?id="+videoID+"&key="+key+"&part=snippet,contentDetails";

		return $http.get(url, {cache: true});
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

//})