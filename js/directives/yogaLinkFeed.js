//define(['app'], function(app) {
	
angular.module('YogaPoseApp')
	.directive('yogaLinkFeed', ['$compile', function($compile) {
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
//})