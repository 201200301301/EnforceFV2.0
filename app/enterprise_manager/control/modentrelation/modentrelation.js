
angular.module('myApp.modentrelation', ['ngRoute'])

.controller('ModentrelationCtrl', ['$http','$scope','$location','$rootScope',function($http,$scope,$location,$rootScope) {
    //查找关系类型
        $http.get('http://localhost:3000/enterprise_manager/getRelationType','')
                .success(function(data){
                    //alert("成功");
                    $scope.item = data.data;
                    alert(item.type);
                })
                .error(function(data){
                    alert("失败");
                });
        /*$scope.getfrom = function(){
            $scope.pos = from;
        };
        $scope.getto = function(){
            $scope.pos = to;
        }
        $scope.getsupply = function(){
            $scope.reltype = Supply_to;
        }*/
        $scope.select = function(){
           // alert($scope.bfposition);
           // alert($scope.item);
            var config={params:{enterpriseId:$rootScope.current_enterpriseId,relationshipType: $scope.item,position:$scope.bfposition}};
            $http.get('http://localhost:3000/enterprise_manager/select',config)
                .success(function(data){
                    //alert(data.message);
                    if(data.message == 'no') alert("关系查找不存在");
                    $scope.relationship = data.data;
                })
                .error(function(data){
                    alert("失败");
                });
        };
        $scope.killrelationship = function($index){
            var config={params:{gid:$scope.relationship[$index].gxid}};
            $http.get('http://localhost:3000/enterprise_manager/killrelationship',config)
                .success(function(data){
                    alert("关系解除成功！");
                    var config={params:{enterpriseId:$rootScope.current_enterpriseId,relationshipType: $scope.item,position:$scope.bfposition}};
                    $http.get('http://localhost:3000/enterprise_manager/select',config)
                        .success(function(data){
                            $scope.relationship = data.data;
                        })
                        .error(function(data){
                        });
                })
                .error(function(data){
                    alert("失败");
                });
        };
        $scope.modnumber = function($index) {
            //alert($scope.re.fromInTo);
            var fromInTo = prompt("请输入要分配的新的内部编号：", "");
            // alert(fromInTo);
            if (fromInTo != null) {
                while (fromInTo == "") {
                    alert("请输入有效值！");
                    fromInTo = prompt("请输入要分配的新的内部编号：", "");
                }
                //alert(fromInTo);
                if(fromInTo != null) {
                    var config = {
                        params: {
                            bfqyid: $rootScope.current_enterpriseId,
                            dfqyid: $scope.relationship[$index].enterprise.id,
                            relationType: $scope.item,
                            bfposition: $scope.bfposition,
                            dfbh: fromInTo
                        }
                    };
                    $http.get('http://localhost:3000/enterprise_manager/buildrelationship', config)
                        .success(function (data) {
                            alert("申请成功，请等待审批");
                        })
                        .error(function (data) {
                            alert("失败");
                        });
                }
            }
        }

}]);