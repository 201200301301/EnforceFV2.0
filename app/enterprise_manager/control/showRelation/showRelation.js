
var showRelation=angular.module('myApp.showRelation', ['ngRoute']);

userManage.controller('ShowRelationCtrl', ['$http','$scope','$location','$rootScope',function($http,$scope,$location,$rootScope) {
    //根据两企业间的ID查找他们之间的关系
    $scope.select = function()  {
        var param = {params:{aid:$rootScope.current_enterpriseId,bid:$scope.id}};
        $http.get('http://localhost:3000/enterprise_manager/showRelation',param)
            .success(function(data) {
                if (data.message == "ok")
                $scope.rows = data.data;
                else alert("关系不存在");
            })
            .error(function(data) {
                alert("失败");
            });
    };
}]);
