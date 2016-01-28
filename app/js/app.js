angular.module('testingAngularApp', []);

angular.module('testingAngularApp')

.controller('testingAngularCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$scope.title = "Testing Angular Applications";

	$scope.destinations = [];

	$scope.newDestination = {
		city: undefined,
		country: undefined
	};

	$scope.addDestination = function () {
		$scope.destinations.push({
			city: $scope.newDestination.city,
			country: $scope.newDestination.country
		});
	};

	// $scope.removeDestination = function (index) {
	// 	$scope.destinations.splice(index, 1)	
	// };
}])