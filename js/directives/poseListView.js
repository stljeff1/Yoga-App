//define(['app'], function(app) {
angular.module('YogaPoseApp')
	.directive('poseListView', ['$location', function($location) {
		return {
			restrict: 'CA',
			scope: false,
			link: function($scope, element, attrs) {

				$scope.$watch(function(scope) { return scope.isReady;}, function(newVal) {
					var affixPanel;

					if(newVal) {
						$rows = angular.element('.pose-listing', element);

						angular.forEach($rows, function(row) {
							var $row = angular.element(row);
							var $img = angular.element('.pose-image-viewport img');
							$row.on('mouseenter', function() {
								$row.toggleClass('hover');
								$img.attr('src',$row.data('image'));
							}).on('mouseleave', function() {
								$row.toggleClass('hover');
								$img.attr('src', $scope.defaultImage);
							}).on('click', function($e) {
								$scope.$apply(function() {
									$scope.go($row.data('path'));
								});
								return false;
							});
						});

						affixPanel = angular.element('.affix-panel', element)
						if(affixPanel) {
							affixPanel.affix({
								offset: {
									top: affixPanel.offset().top
								}
							}).width(affixPanel.width());
						}

					}
				})
			}
		}
	}]);

//})