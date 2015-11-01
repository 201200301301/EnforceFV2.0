'use strict';

angular.module('myApp.MyApp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/MyApp', {
            templateUrl: 'MyApp/MyApp.html',
            controller: 'MyAppCtrl'
        });
    }])

    .controller('MyAppCtrl', [function() {

    }]);