
var messageXG=angular.module('myApp.enterpriseMessage', ['ngRoute']);

messageXG.controller('EnterpriseMessageCtrl', ['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope) {
    //显示企业详细信息
    $scope.id= $rootScope.current_enterpriseId;
    var config={params:{id: $rootScope.current_enterpriseId}};
    $http.get('http://localhost:3000/enterprise_manager/EMessage',config)
        .success(function(data){
            $scope.rows = data.enterprise;
        })
        .error(function(data){
            alert("失败");
        });

    //企业信息修改
    $scope.update=function($event){
        var config={params:{id: $scope.id,mc:$scope.rows.mc,jc:$scope.rows.jc,address:$scope.rows.address,business:$scope.rows.business,
            faren:$scope.rows.faren,contactPerson:$scope.rows.contactPerson,phone:$scope.rows.phone,email:$scope.rows.email,status:$scope.rows.status,
            createTime:$scope.rows.createTime,lastModifyTime:$scope.rows.lastModifyTime}};
        $http.get('http://localhost:3000/enterprise_manager/EMessageXG',config)
            .success(function(data) {
                if (data.message == "ok")
                    alert("修改成功");
                else
                    alert("修改失败");
            })
            .error(function(data){                alert("失败");
            });
    }
}]);