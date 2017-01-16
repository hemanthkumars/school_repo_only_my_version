angular.module('app')
.controller ('feeTypeMasterCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile,$timeout) {
	$scope.feeType=0;
	 $scope.fetchFeeType=function(){
			var serverPath="admin/fee/fetchFeeType";
			var input={};
			$http({
	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{"input":JSON.stringify(input)} 

	        }).success(function (data, status, headers, config) {
	        	$rootScope.validateSession(data);
	        	if(data.error=="true"){
	        		alertify.error(data.message);
	        	}else{
	        		$("#feeTypeMaster").empty();
	        		var results=JSON.parse(data.result);
	        		   $scope.feeTypeMaster="";
	        							$scope.feeTypeMaster+=" <table class='table' >";
	        							$scope.feeTypeMaster+="     <thead>";
	        							$scope.feeTypeMaster+="       <tr>";
	        							$scope.feeTypeMaster+="         <th>Sl No</th>";
	        							$scope.feeTypeMaster+="         <th>Fee Type</th>";
	        							$scope.feeTypeMaster+="         <th>Is Concession Type ?</th>";
	        							$scope.feeTypeMaster+="         <th>Delete</th>";
	        							$scope.feeTypeMaster+="       </tr>";
	        							$scope.feeTypeMaster+="     </thead>";
	        							$scope.feeTypeMaster+="     <tbody>";
	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1
	        								$scope.feeTypeMaster+="<tr>";
	        								$scope.feeTypeMaster+="   <td>"+slno+"</td>";
	        								$scope.feeTypeMaster+="   <td>"+results[int].feeType+"</td>";
	        								var conncesson="No";
	        								if(results[int].isConcessionType==0){
	        									conncesson="No";
	        								}else{
	        									conncesson="Yes";
	        								}
	        								$scope.feeTypeMaster+="   <td>"+conncesson+"</td>";
	        								$scope.feeTypeMaster+="   <td><input type='button' value='Delete' ng-click=\"deleteFeeType("+results[int].schoolFeeTypeId+")\" /></td>";
	        								$scope.feeTypeMaster+=" </tr>";
	        							}

	        							$scope.feeTypeMaster+="     </tbody>";
	        							$scope.feeTypeMaster+=" </table>";
	        							var temp = $compile($scope.feeTypeMaster)($scope);
	        							$("#feeTypeMaster").append(temp);
	        							$scope.feeType="";
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    $scope.fetchFeeType();
	    $scope.saveFeeTypeMaster=function(){
	    	if($scope.feeType==""||$scope.feeType==undefined){
	    		alertify.error("Please Enter the Fee Type");
	    		return;
	    	}
	    	if($scope.isConsessionType==""||$scope.isConsessionType==undefined){
	    		alertify.error("Please Select Concession Or not");
	    		return;
	    	}
			var serverPath="admin/fee/saveFeeType";
			var input={"feeType":$scope.feeType,"isConcession":$scope.isConsessionType};
			$http({
	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{"input":JSON.stringify(input)} 

	        }).success(function (data, status, headers, config) {
	        	$rootScope.validateSession(data);
	        	if(data.error=="true"){
	        		alertify.error(data.message);
	        	}else{
	        		alertify.success(data.message);
	        		$scope.fetchFeeType();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
	    $scope.deleteFeeType=function(schoolFeeTypeId){
			var serverPath="admin/fee/deleteFeeType";
			var input={"schoolFeeTypeId":schoolFeeTypeId};
			$http({
	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{"input":JSON.stringify(input)} 

	        }).success(function (data, status, headers, config) {
	        	$rootScope.validateSession(data);
	        	if(data.error=="true"){
	        		alertify.error(data.message);
	        	}else{
	        		alertify.success(data.message);
	        		$scope.fetchFeeType();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
	    
 });

