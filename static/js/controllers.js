var eplTableControllers = angular.module('eplTableControllers', []);

eplTableControllers.teams = 20;
eplTableControllers.top_tier_teams = 4;
eplTableControllers.mid_tier_teams = 1;
eplTableControllers.bottom_tier_teams = 3;

eplTableControllers.added_top = eplTableControllers.added_mid = 0;

eplTableControllers.add_tier = function(row) {
    if (eplTableControllers.added_top < eplTableControllers.top_tier_teams) {
        // Mark top-tier teams, unless they're all marked...
        row['tier'] = 'top';
        eplTableControllers.added_top++;
    } else if (eplTableControllers.added_mid < eplTableControllers.mid_tier_teams) {
        // In which case, mark mid-tier teams, unless they're all marked...
        row['tier'] = 'mid';
        eplTableControllers.added_mid++;
    } else if (eplTableControllers.teams - row.position < eplTableControllers.bottom_tier_teams) {
        // Otherwise, check if we're at the end, where we can mark bottom-tier teams.
        row['tier'] = 'bot';
    }
}

eplTableControllers.controller('StandardTableCtrl', ['$scope', 'Team',
    function($scope, Team) {
        $scope.type = 'standard';

        Team.query(function(data) {
            var rows = [];
            for (var i in data.results) {
                // Standard table request, just just add the data as-is to the rows list
                eplTableControllers.add_tier(data.results[i]);
                rows.push([data.results[i]]);
            }
            eplTableControllers.added_top = eplTableControllers.added_mid = 0;
            
            $scope.rows = rows;
        });
    }]);

eplTableControllers.controller('CannTableCtrl', ['$scope', 'Team',
    function($scope, Team) {
        $scope.type = 'cann';
        Team.query({ cann : true }, function(data) {
            var rows = []
            for (var i in data.results) {
                if (data.results[i].length > 0) {
                    // This is a cann table request, so there could be multiple or no teams in a single row
                    for (var j in data.results[i]) {
                        eplTableControllers.add_tier(data.results[i][j]);
                    }
                }
                rows.push(data.results[i]);
            }
            eplTableControllers.added_top = eplTableControllers.added_mid = 0;

            $scope.rows = rows;
        });
    }]);

eplTableControllers.controller('VisualCtrl', ['$scope', 'Team', 'D3js',
    function($scope, Team, D3js) {
        $scope.type = 'visual';
        Team.query(function(data) {
            var points = [];
            // This is a visual request, so we only need a list of the points
            for (var i in data.results) {
                points.push(data.results[i].points);
            }
            // Draw the graph using d3js
            D3js.draw_graph(points);
        });
    }]);

eplTableControllers.controller('DetailCtrl', ['$scope', '$routeParams', 'Team',
    function($scope, $routeParams, Team) {
        Team.get({ id: $routeParams.id }, function(data) {
            $scope.team = data.results;
        });
    }]);