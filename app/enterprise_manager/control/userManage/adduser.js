
var adduser=angular.module('myApp.adduser', ['ngRoute']);

adduser.controller('AdduserCtrl', ['$http','$scope','$location',function($http,$scope,$location) {
    $scope.add=function(){
        var config={params:{name:$scope.name,address:$scope.address,phone:$scope.phone,email:$scope.email,status:$scope.status}};
        $http.get('http://localhost:3000/enterprise_manager/adduser',config)
            .success(function(data){
                alert(data.id);
                $location.path('/userManage');
            })
            .error(function(data){
                alert("失败");
            });
    }
}]);