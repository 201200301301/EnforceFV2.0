var buildER=angular.module('myApp.buildER', ['ngRoute']);

buildER.controller('BuildERCtrl', ['$http','$scope','$location','$rootScope','Paginator',function($http,$scope,$location,$rootScope,Paginator) {
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
        $http.get('http://localhost:3000/enterprise_manager/findEtoBuild',config)
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

    //根据企业名称、主营产品、地址和企业状态查找企业(可选)
    $scope.select = function()  {
        $scope.currentPage=1;
        var config={params:{currentPage:$scope.currentPage,name:$scope.name,product:$scope.product,address:$scope.address,Status:$scope.Status}};
        $http.get('http://localhost:3000/enterprise_manager/findEtoBuild',config)
            .success(function(data){
                if (data.message == "ok") {
                    $scope.rows = data.data;
                    $scope.total=data.total;
                    $scope.totalPage = Math.ceil($scope.total / 10);
                    $scope.endPage = $scope.totalPage;
                }
                else {
                    alert("不存在企业");
                }
            })
            .error(function(data){
                alert("失败");
            });
    };

    //建立关系
    $scope.relation=function(id){
        $scope.id=id;
    };

    $scope.bfqyid=$rootScope.current_enterpriseId;
    $http.get('http://localhost:3000/enterprise_manager/getRelationType')
        .success(function(data){
            $scope.RelationTypes=data.data;
        })
        .error(function(data){
            alert("失败");
        });

    //企业间建立关系
    $scope.build=function($event){
        var config={params:{bfqyid:$rootScope.current_enterpriseId,dfqyid:$scope.id,relationType:$scope.RelationTypes,bfposition:$scope.bfposition,dfbh:$scope.dfbh}};
        $http.get('http://localhost:3000/enterprise_manager/buildER',config)
            .success(function(data){
                if (data.message == "ok")
                    alert("建立关系成功");
                else alert("建立关系不成功");
            })
            .error(function(data){
                alert("失败");
            });
    }
}]);

