
var enterpriseRelationApproval=angular.module('myApp.enterpriseRelationApproval', ['ngRoute']);

enterpriseRelationApproval.controller('EnterpriseRelationApproval', ['$scope','$http','$rootScope','Paginator',function($scope,$http,$rootScope,Paginator) {
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
            name:$scope.name,
            product:$scope.product,
            address:$scope.address,
            Status:$scope.Status
        }};
        $http.get('http://localhost:3000/enterprise_manager/getRelationApply',config)
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
    $scope.currentPage=1;
    var config = {
        params: {
            currentPage:$scope.currentPage,enterpriseId: $rootScope.current_enterpriseId
        }
    };
    //alert($rootScope.current_enterpriseId);
    $http.get('http://localhost:3000/enterprise_manager/getRelationApply', config)
        .success(function (data) {
            $scope.rows = data.data;
            $scope.total=data.total;
            $scope.totalPage = Math.ceil($scope.total / 10);
            $scope.endPage = $scope.totalPage;
        })
        .error(function (data) {
            alert("失败");
        });
        //根据关系申请的ID，提交审核员审核意见和分配给对方的内部编号
        $scope.CheckAdvice=function(id)
        {
            $scope.id=id;
        };
       $scope.save=function(){
            var config={params:{
                relationApplyId: $scope.id,
                bfposition:$scope.bfposition,
                status:$scope.status,
                dfbh:$scope.dfbh,
                checkAdvice:$scope.checkAdvice
            }};
            $http.get('http://localhost:3000/enterprise_manager/saveCheckAdvice',config)
                .success(function(data){
                    if(data.message=='ok') {
                        alert("保存成功！");
                        $scope.currentPage=1;
                        var config = {
                            params: {
                                currentPage:$scope.currentPage,enterpriseId: $rootScope.current_enterpriseId
                            }
                        };
                        $http.get('http://localhost:3000/enterprise_manager/getRelationApply', config)
                            .success(function (data) {
                                $scope.rows = data.data;
                                $scope.total=data.total;
                                $scope.totalPage = Math.ceil($scope.total / 10);
                                $scope.endPage = $scope.totalPage;
                            })
                            .error(function (data) {
                                alert("失败");
                            });
                    }
                    else alert("保存失败，请修改输入格式！");
                })
                .error(function(data){
                    alert("失败");
                });
        }
}]);