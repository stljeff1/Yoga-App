
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
