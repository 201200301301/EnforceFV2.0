'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.MyApp',
  'myApp.login',
  'myApp.enterpriseMessage',
  'myApp.userManage',
  //'myApp.adduser',
  'myApp.showdetail',
   'myApp.showRelation',
    'myApp.buildER',
    'myApp.enterpriseRelationApproval',
    'myApp.allocateTask',
    'myApp.modentrelation',
    'paginator',
  'myApp.version'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/login',{
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl'
      })

      .when('/enterpriseMessage',{
          templateUrl: 'enterprise_manager/view/enterpriseMessage/enterpriseMessage.html',
          controller: 'EnterpriseMessageCtrl'
      })

      .when('/userManage',{
        templateUrl: 'enterprise_manager/view/userManage/userManage.html',
        controller: 'UsermanegeCtrl'
      })

      //.when('/adduser',{
      //  templateUrl: 'enterprise_manager/view/userManage/adduser.html',
      //  controller: 'AdduserCtrl'
      //})

      .when('/showdetail', {
        templateUrl: 'enterprise_manager/view/userManage/showdetail.html',
        controller: 'ShowdetailCtrl'
      })

      .when('/showRelation', {
          templateUrl: 'enterprise_manager/view/showRelation/showRelation.html',
          controller: 'ShowRelationCtrl'
      })

      .when('/buildER', {
          templateUrl: 'enterprise_manager/view/buildER/buildER.html',
          controller: 'BuildERCtrl'
      })

      //.when('/buildR', {
      //    templateUrl: 'enterprise_manager/view/buildER/buildR.html',
      //    controller: 'BuildRCtrl'
      //})

      .when('/ERApproval', {
          templateUrl:'enterprise_manager/view/enterpriseRelationApproval/enterpriseRelationApproval.html',
          controller:'EnterpriseRelationApproval'
      })

      .when('/modentrelation', {
          templateUrl:'enterprise_manager/view/modentrelation/modentrelation.html',
          controller:'ModentrelationCtrl'
      })

      .when('/allocateTask', {
          templateUrl: 'enterprise_manager/view/allocateTask/allocateTask.html',
          controller: 'AllocateTaskCtrl'
      })

      .otherwise({redirectTo: '/login'});
}]);
