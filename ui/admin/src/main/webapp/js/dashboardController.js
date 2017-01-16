angular.module('app')
.controller ('dashboardController', function($scope,$rootScope,$stateParams,$http,$filter,$state) {
    console.log("dashboard");
    $scope.goToProductPage=function(){
    	$state.go("product",{});
    }
    
    $scope.goToSalesPage=function(){
    	$state.go("sales",{});
    }
 });