var eplTableApp = angular.module('eplTableApp', [
    'ngRoute',
    'eplTableControllers',
    'eplTableServices'
]);

eplTableApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/standard', {
                templateUrl: '/static/partials/table.html',
                controller: 'StandardTableCtrl'
            }).
            when('/cann', {
                templateUrl: '/static/partials/table.html',
                controller: 'CannTableCtrl'
            }).
            when('/team/:id', {
                templateUrl: '/static/partials/detail.html',
                controller: 'DetailCtrl'
            }).
            otherwise({
                redirectTo: '/standard'
            });
    }]);