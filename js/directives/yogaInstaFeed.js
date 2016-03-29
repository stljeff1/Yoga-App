//define(['app'], function(app) {
angular.module('YogaPoseApp')
	.directive('yogaInstaFeed', ['$compile', function($compile) {
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
//})