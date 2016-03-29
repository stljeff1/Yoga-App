//define(['app'], function(app) {
angular.module('YogaPoseApp')
	.directive('yogaVideoList', ['$compile', function($compile) {
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
//})