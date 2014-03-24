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
        Team.query(function(data) {
            var rows = []; // Setup array of rows
            var last_points = data.results[0].points;
            for (var i = 0; i < data.results.length; i++) {
                if (last_points > data.results[i].points + 1) {
                    for (var j = 0; j < last_points - (data.results[i].points+1); j++) {
                        rows.push([]);
                    }
                }
                var this_row = [data.results[i]];
                for (var j = i+1; j < data.results.length; j++) {
                    if (data.results[i].points == data.results[j].points) {
                        this_row.push(data.results[j]);
                    }
                }

                i += this_row.length - 1;
                rows.push(this_row);
                last_points = this_row[this_row.length - 1].points;
            }

            $scope.rows = rows;
        });
    }]);