var eplTableServices = angular.module('eplTableServices', ['ngResource']);

eplTableServices.factory('Team', ['$resource', 
    function($resource) {
        return $resource('/teams/:id', {}, {
            query: { method: "GET" }
        });
    }]);