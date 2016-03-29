//define(['app'], function(app) {

 angular.module('YogaPoseApp').directive('bootstrapSwitch', [
		function() {
		  return {
		      restrict: 'A',
		      scope: false,
		      link: function($scope, element, attrs) {
		          element.bootstrapSwitch({size: 'mini'});
		          var toggleTag = function() {
		          	var tag = angular.element(element).data('tagid');
		          	$scope.toggleTag(tag);

			     };
		          element.on('switchChange.bootstrapSwitch', function(event, state) {
		          	toggleTag();
		          	$scope.$apply();

		          	//$scope.toggleTag(angular.element(this).data('tagName'));
		          });
		          /*
		          $scope.$watch($scope.activeTags, function(newValue, oldValue) {
		              console.log($scope.activeTags);
		          });*/
		      }
		  };
		}
	]);


//})