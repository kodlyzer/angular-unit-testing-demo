describe('Testing AngularJS Test Suite', function() {
    beforeEach(module('testingAngularApp'));

    describe('Testing AngularJS Controller', function() {
        var scope, ctrl, httpBackend, timeout;
        beforeEach(inject(function($controller, $rootScope, $httpBackend, $timeout) {
            scope = $rootScope.$new();
            ctrl = $controller('testingAngularCtrl', {
                $scope: scope
            });
            httpBackend = $httpBackend;
            timeout = $timeout;
        }));


        afterEach(function () {
        	// makes sure there aren't any http
        	// requests pending which haven't been tested
        	httpBackend.verifyNoOutstandingExpectation();
        	httpBackend.verifyNoOutstandingRequest();
        });

        it('should initialize the title in the scope', function() {
            expect(scope.title).toBeDefined();
            expect(scope.title).toBe("Testing Angular Applications");
        });

        it('should add destination city and country to the destinations list', function() {
            expect(scope.destinations).toBeDefined();
            expect(scope.destinations.length).toBe(0);

            scope.newDestination = {
                city: "Trivandrum",
                country: "India"
            };

            scope.addDestination();

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe("Trivandrum");
            expect(scope.destinations[0].country).toBe("India");

            scope.newDestination.city = "London";
            scope.newDestination.country = "England";

            scope.addDestination();

            expect(scope.destinations.length).toBe(2);
            expect(scope.destinations[1].city).toBe("London");
            expect(scope.destinations[1].country).toBe("England");
            expect(scope.destinations[0].city).toBe("Trivandrum");
            expect(scope.destinations[0].country).toBe("India");
        });

        it('should remove a destination from the destinations list', function() {
            scope.destinations = [{
                city: "Paris",
                country: "France"
            }, {
                city: "Kochi",
                country: "India"
            }];

            expect(scope.destinations.length).toBe(2);

            scope.removeDestination(0);

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe("Kochi");
            expect(scope.destinations[0].country).toBe("India");
        });

        it('should update the weather for a specific destination', function() {
            scope.destination = {
                city: "Trivandrum",
                country: "India"
            };

            httpBackend.expectGET("http://api.openweathermap.org/data/2.5/weather?q=" + scope.destination.city + "," + scope.destination.country + "&appid=" + scope.apiKey)
                .respond({
                    
                    "weather": [{
                        "id": 721,
                        "main": "Haze",
                        "description": "haze",
                        "icon": "50n"
                    }],                    
                    "main": {
                        "temp": 301.15
                    }
                });

            scope.getWeather(scope.destination);

            // flush the requests, 
            // ie, send response to all pending requests
            httpBackend.flush();

            expect(scope.destination.weather.main).toBe("Haze");
            expect(scope.destination.weather.temp).toBe(28);
        });

		it('should remove error message after a fixed period of time', function () {
			scope.message = "Error";
			expect(scope.message).toBe("Error");

			// apply explicity
			scope.$apply();

			// flush all pending timeouts
			timeout.flush();

			expect(scope.message).toBeNull();
		})
    });
});
