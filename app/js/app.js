angular.module('testingAngularApp', []);

angular.module('testingAngularApp')

.controller('testingAngularCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$scope.title = "Testing Angular Applications";
}])