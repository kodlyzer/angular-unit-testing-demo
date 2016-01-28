describe('Testing AngularJS Test Suite', function() {
    beforeEach(module('testingAngularApp'));

    describe('Testing AngularJS Controller', function() {
    	var scope, ctrl;
        beforeEach(inject(function($controller, $rootScope) {
        	scope = $rootScope.$new();
            ctrl = $controller('testingAngularCtrl', {
                $scope: scope
            });
        }));

        it('should initialize the title in the scope', function() {
            expect(scope.title).toBeDefined();
            expect(scope.title).toBe("Testing Angular Applications");
        });

        it('should add destination city and country to the destinations list', function () {
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
    });
});
