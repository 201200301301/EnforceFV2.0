
var login = angular.module('myApp.login',['ngRoute']).run(['$rootScope', function($rootScope) {
    $rootScope.authenticated = false;
    $rootScope.current_enterpriseId='';
}]);

login.controller('LoginCtrl', ['$http','$scope','$location','$rootScope',function($http,$scope,$location,$rootScope) {
    //点击登录
    $scope.login=function($event){
        var config={params:{username:$scope.username,password:$scope.password}};
        $http.get('http://localhost:3000/login',config)
            .success(function(data){
                if(data.message=="ok") {
                    //通过管理员ID查询所在企业ID，并保存在rootScope中，以便在其他页面调用
                    $rootScope.current_enterpriseId = data.enterprise.id;
                    $location.path('/enterpriseMessage');//登陆后，跳转到企业信息修改页面
                }
                else
                    alert("此用户不存在，请重新登录");
            })
            .error(function(data){
                alert("失败");
            });
    }
}]);