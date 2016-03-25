
app.directive('fileUpload', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, $el, attrs) {
           var files = $parse(attrs.fileUpload);
           var fileSetter = files.assign;
           //console.log(files, fileSetter,attrs, $scope);

           $scope.$watch(
           	function(scope) { return scope.file;}, 
           	function(newVal, oldVal) {
           		//console.log('watching file upload', newVal);
           		if(!newVal) {
           			//console.log('reset');
           			$el.val(null);
           		}
           	}
           );

           $el.bind('change', function() {
           	$scope.$apply(function() {
           		console.log($el[0].files[0]);
           		fileSetter($scope, $el[0].files[0]);
           		$scope.file = true;
           	})
           });
       
        }
    };
}]);