angular.module('testingAngularApp', []);

angular.module('testingAngularApp')

.controller('testingAngularCtrl', ['$rootScope', '$scope', '$http', '$timeout', 'helpersFactory',
    function($rootScope, $scope, $http, $timeout, helpersFactory) {
        $scope.title = "Testing Angular Applications";

        $scope.destinations = [];

        //api key from 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=44db6a862fba0b067b1930da0d769e98'
        $scope.apiKey = "44db6a862fba0b067b1930da0d769e98";

        $scope.newDestination = {
            city: undefined,
            country: undefined
        };

        $scope.addDestination = function() {
            $scope.destinations.push({
                city: $scope.newDestination.city,
                country: $scope.newDestination.country
            });
        };

        $scope.removeDestination = function(index) {
            $scope.destinations.splice(index, 1)
        };

        $rootScope.messageWatcher = $rootScope.$watch('message', function() {
            if ($rootScope.message) {
                $timeout(function() {
                    $rootScope.message = null;
                }, 3000);
            }
        });
    }
])

.factory('helpersFactory', function() {
    return {
        convertKelvinToCelsius: function(temp) {
            return Math.round(temp - 273);
        }
    }
})

.filter('warmestDestinations', function() {
    return function(destinations, minimumTemp) {
        var warmDestinations = [];

        angular.forEach(destinations, function(destination) {
            if (destination.weather && destination.weather.temp && destination.weather.temp >= minimumTemp) {
                warmDestinations.push(destination);
            }
        });

        return warmDestinations
    }
})

.directive('destinationDirective', function() {
    return {
        scope: {
            destination: '=',
            apiKey: '=',
            onRemove: '&'
        },
        controller: function($scope, $http, $rootScope, helpersFactory) {

            $scope.getWeather = function(destination) {
                $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + destination.city + "," + destination.country + "&appid=" + $scope.apiKey)
                    .then(function(response) {
                        if (response.data.weather) {
                            destination.weather = {};
                            destination.weather.main = response.data.weather[0].main;
                            destination.weather.temp = helpersFactory.convertKelvinToCelsius(response.data.main.temp);
                        } else {
                            $rootScope.message = "City not found";
                        }
                    }, function(error) {
                        $rootScope.message = "Server error!";
                    });

            };
        },
        template: '<span>{{destination.city}}, {{destination.country}}</span>' +
            '<span ng-if="destination.weather"> - {{destination.weather.main}}, {{destination.weather.temp}}</span>' +
            '<button ng-click="onRemove()">Remove</button>' +
            '<button ng-click="getWeather(destination)">Update Weather</button>'
    };
});
