var showdetail=angular.module('myApp.showdetail', ['ngRoute']);

showdetail.controller('ShowdetailCtrl', ['$scope','$http','$location',function($scope,$http,$location) {
    //显示详细信息
    $scope.id=$location.search().id;
    var config={params:{id:$location.search().id}};
    $http.get('http://localhost:3000/enterprise_manager',config)
        .success(function(data){
            $scope.rows = data.employee;
        })
        .error(function(data){
            alert("失败");
        });

    //修改用户信息
    $scope.update=function($event){
        var config={params:{id: $scope.id,name:$scope.rows.name,address:$scope.rows.address,phone:$scope.rows.phone,
            email:$scope.rows.email,status:$scope.rows.status,createTime:$scope.rows.createTime}};
        $http.get('http://localhost:3000/enterprise_manager/UserMessageXG',config)
            .success(function(data){
                if(data.message=="ok") {
                    alert("保存成功");
            }
                else
                    alert("保存失败");
            })
            .error(function(data){
                alert("失败");
            });
    }
}]);