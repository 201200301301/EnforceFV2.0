
var userManage=angular.module('myApp.userManage', ['ngRoute']);

userManage.controller('UsermanegeCtrl', ['$http','$scope','$location','$rootScope','Paginator',function($http,$scope,$location,$rootScope,Paginator) {
    //分页
    $scope.currentPage = 0;
    $scope.totalPage = 0;
    $scope.pageSize = 10;
    $scope.goToPage = 0;
    $scope.total = 0;
    $scope.p = {};

    //载入
    $scope.load = function() {
        var config={params:{
            currentPage:$scope.currentPage,
            name:$scope.id
        }};
        $http.get('http://localhost:3000/enterprise_manager/selectAll',config)
            .success(function(data){
                $scope.rows = data.data;
            })
            .error(function(data){
                alert("失败");
            });
    };
    //下一页
    $scope.next = function() {
        $scope.currentPage = Paginator($scope.currentPage,$scope.totalPage,$scope.goToPage).next();
        $scope.load();
    };
    //上一页
    $scope.prev = function() {
        $scope.currentPage = Paginator($scope.currentPage,$scope.totalPage,$scope.goToPage).prev();
        $scope.load();
    };
    //首页
    $scope.first = function() {
        $scope.currentPage = Paginator($scope.currentPage,$scope.totalPage,$scope.goToPage).first();
        $scope.load();
    };
    //末页
    $scope.end = function() {
        $scope.currentPage = Paginator($scope.currentPage,$scope.totalPage,$scope.goToPage).end();
        $scope.load();
    };
    //转到第几页
    $scope.go = function() {
        if( $scope.p.goToPage<=73) {
            $scope.currentPage = Paginator($scope.currentPage, $scope.totalPage, $scope.p.goToPage).go();
            $scope.load();
        }
        else
            alert("页数超过限制");
    };

    //用户ID查找用户信息或者查询所有的用户
    $scope.select = function()  {
        if ($scope.username == null) {
            $scope.currentPage=1;
            var param = {params:{currentPage:$scope.currentPage,id: $rootScope.current_enterpriseId}};
            $http.get('http://localhost:3000/enterprise_manager/selectAll',param)
                .success(function(data) {
                    $scope.rows = data.data;
                    $scope.total=data.total;
                    $scope.totalPage = Math.ceil($scope.total / 10);
                    $scope.endPage = $scope.totalPage;
                })
                .error(function(data) {
                    alert("失败");
                });
        } else {
            var config={params:{id:$scope.username}};
            $http.get('http://localhost:3000/enterprise_manager',config)
                .success(function(data){
                    if (data.message == "ok") {
                        $scope.rows = data;
                        $scope.ID =$scope.username;
                    }
                    else {
                        alert("用户不存在");
                        $location.path('/userManage');
                    }
                })
                .error(function(data){
                    alert("失败");
                });
        }
    };

    //删除用户并刷新
    $scope.delete=function(id) {
        //alert("是否删除？");
        if(confirm("是否删除？")) {
            var config={params:{id:id}};
            $http.get('http://localhost:3000/enterprise_manager/delete',config)
                .success(function(data){
                    if (data.message == 'ok')
                    alert('删除成功');
                    else alert('没有删除');
                })
                .error({
                })}
        else window.reset();
        // $scope.id=$location.search().id;//location.search是从当前URL的?号开始的字符串
        //刷新页面
        if ($scope.username == null) {
            var config={params:{id:$rootScope.current_enterpriseId}};
            $http.get('http://localhost:3000/enterprise_manager/selectAll',config)
                .success(function(data){
                    $scope.rows = data.data;
                })
                .error(function(data){
                    alert("失败");
                });
        }else $location.path('/userManage');
    };

    //新增用户
    $scope.add=function(){
        var config={params:{name:$scope.name,address:$scope.address,phone:$scope.phone,email:$scope.email,status:$scope.status}};
        $http.get('http://localhost:3000/enterprise_manager/adduser',config)
            .success(function(data){
                alert(data.id);
            })
            .error(function(data){
                alert("失败");
            });
    };

    //查看详细
    $scope.showdetail=function(id){
        $scope.id=id;
        var config={params:{id:id}};
        $http.get('http://localhost:3000/enterprise_manager',config)
            .success(function(data){
                $scope.detail = data.employee;
            })
            .error(function(data){
                alert("失败");
            });
    }

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
