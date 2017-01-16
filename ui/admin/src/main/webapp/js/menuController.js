angular.module('app')
.controller ('menuController', function($scope,$rootScope,$stateParams,$http,$filter,$state) {
  alertify.success("menuController");
  
  $scope.swithView=function(path){
	  if(path=='login'){
		  $("#menuGrid").hide();
	  }
	  $state.go(path,{});
  }
 });