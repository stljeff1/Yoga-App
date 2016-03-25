app.directive('toggleClass', function() {
	return {
		restrict: 'AC',
		link: function($scope, $el, attrs) {
			$el.bind('click', function() {
				$el.toggleClass(attrs.toggleClass);
			})
		}
	}
});
