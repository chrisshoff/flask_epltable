var eplTableControllers = angular.module('eplTableControllers', []);

eplTableControllers.controller('StandardTableCtrl', ['$scope', 'Team',
    function($scope, Team) {
        $scope.type = 'Standard';
        Team.query(function(data) {
            var rows = [];
            for (var i in data.results) {
                rows.push([data.results[i]]);
            }
            
            $scope.rows = rows;
        });
    }]);

eplTableControllers.controller('CannTableCtrl', ['$scope', 'Team',
    function($scope, Team) {
        $scope.type = 'Cann';
        Team.query({ cann : true }, function(data) {
            var rows = []
            for (var i in data.results) {
                rows.push(data.results[i]);
            }

            $scope.rows = rows;
        });
    }]);