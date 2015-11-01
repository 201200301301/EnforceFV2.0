
var allocateTask=angular.module('myApp.allocateTask', ['ngRoute']);

allocateTask.controller('AllocateTaskCtrl', ['$http','$scope','$location',function($http,$scope,$location) {
    //用户ID查找用户负责企业信息
    function cyes(){
        var centerpriseid = prompt("请输入分配给该用户的企业：","");
        var config={params:{employeeId:$scope.id,enterpriseId:centerpriseid}};
        $http.get('http://localhost:3000/enterprise_manager/distibutetask',config)
            .success(function(data){
                //alert (data.message);
                alert("任务分配成功");
                var config={params:{id:$scope.id}};
                $http.get('http://localhost:3000/enterprise_manager/modusertask',config)
                    .success(function(data){
                        $scope.items = data.data;
                        $scope.ID =$scope.id;
                    });
               // $location.path('/modusertask');
            })
            .error(function(data){
                alert("失败");
            });
    }
    //查询用户是否分配企业
    $scope.select = function()  {
        if ($scope.id == null){
            alert("输入用户ID");

        }
        else {
            var config = {params: {id: $scope.id}};
            $http.get('http://localhost:3000/enterprise_manager/modusertask', config)
                .success(function (data) {
                    //alert(data.message);
                    if (data.message == 'no') {
                        if (confirm('该用户没有分配企业任务,是否为其分配任务？')) cyes();
                    }
                    else {
                        $scope.items = data.data;
                        $scope.ID = $scope.id;
                    }
                })
                .error(function (data) {
                    alert("失败");
                });
        }
    };
    //删除负责的企业
    $scope.deletetask = function($index){
        var config={params:{gxid:$scope.items[$index].gxid}};
        $http.get('http://localhost:3000/enterprise_manager/deletetask',config)
            .success(function(data){
                //alert(data.message);
                if(data.message == 'ok') {
                    alert("删除成功");
                    var config={params:{id:$scope.id}};
                    $http.get('http://localhost:3000/enterprise_manager/modusertask',config)
                        .success(function(data){
                            $scope.items = data.data;
                        });
                    //$location.reload('modusertask/modusertask.html');
                }
            })
            .error(function(data){
                alert("失败");
            });
    }

}]);