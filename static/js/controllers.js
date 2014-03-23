var eplTableControllers = angular.module('eplTableControllers', []);

eplTableControllers.controller('StandardTableCtrl', ['$scope', 
    function($scope) {
        $scope.type = 'Standard';
    }]);

eplTableControllers.controller('CannTableCtrl', ['$scope', 
    function($scope) {
        $scope.type = 'Cann';
    }]);