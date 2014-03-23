var eplTableApp = angular.module('eplTableApp', [
    'ngRoute',
    'eplTableControllers'
]);

eplTableApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/standard', {
                templateUrl: '/static/partials/standard-table.html',
                controller: 'StandardTableCtrl'
            }).
            when('/cann', {
                templateUrl: '/static/partials/cann-table.html',
                controller: 'CannTableCtrl'
            }).
            otherwise({
                redirectTo: '/standard'
            });
    }]);