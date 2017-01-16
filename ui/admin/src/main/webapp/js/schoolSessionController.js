angular.module('app')
.controller ('schoolSessionCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {

 	  $scope.findSchoolSessions=function(){
			var serverPath="admin/schoolsetup/findSchoolSessions";
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
	        		$("#schoolSessionData").empty();
	        		var results=JSON.parse(data.result);
	        		   $scope.schoolSessionData="";
	        							$scope.schoolSessionData+=" <table class='table' >";
	        							$scope.schoolSessionData+="     <thead>";
	        							$scope.schoolSessionData+="       <tr>";
	        							$scope.schoolSessionData+="         <th>Sl No</th>";
	        							$scope.schoolSessionData+="         <th>Session Name</th>";
	        							$scope.schoolSessionData+="         <th>Session Timings</th>";
	        							$scope.schoolSessionData+="         <th>Is Full Day Session</th>";
	        							$scope.schoolSessionData+="         <th>Delete</th>";
	        							$scope.schoolSessionData+="       </tr>";
	        							$scope.schoolSessionData+="     </thead>";
	        							$scope.schoolSessionData+="     <tbody>";
	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1
	        								$scope.schoolSessionData+="<tr>";
	        								$scope.schoolSessionData+="   <td>"+slno+"</td>";
	        								$scope.schoolSessionData+="   <td>"+results[int].sessionName+"</td>";
	        								$scope.schoolSessionData+="   <td>"+results[int].sessionTimings+"</td>";
	        								var isFullDaySession=results[int].isFullDaySession;
	        								if(isFullDaySession==1){
	        									$scope.schoolSessionData+="   <td>Yes</td>";
	        								}else{
	        									$scope.schoolSessionData+="   <td>No</td>";
	        								}
	        								$scope.schoolSessionData+="   <td><input type='button' value='Delete' ng-click=\"deleteSchoolSession("+results[int].schoolSessionId+")\" /></td>";
	        								$scope.schoolSessionData+=" </tr>";
	        							}

	        							$scope.schoolSessionData+="     </tbody>";
	        							$scope.schoolSessionData+=" </table>";
	        							var temp = $compile($scope.schoolSessionData)($scope);
	        							$("#schoolSessionData").append(temp);
	        							$("#sessionName").val('');
	        							$scope.sessionName="";
	        							$scope.isFullDay=0;
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
	   $scope.findSchoolSessions();
	    
	    $scope.saveSchoolSession=function(){
	    	
	    	if($scope.sessionName==""||$scope.sessionName==undefined){
	    		alertify.error("Please enter session Name");
	    		return;
	    	}
	    	
	    	if($("#fhh").val()==""||$("#fhh").val()==undefined){
	    		alertify.error("Please enter the Start Time");
	    		return;
	    	}
	    	if($("#fmin").val()==""||$("#fmin").val()==undefined){
	    		alertify.error("Please enter the Start Time");
	    		return;
	    	}
	    	
	    	if($("#fampm").val()==""||$("#fampm").val()==undefined){
	    		alertify.error("Please enter the Start Time");
	    		return;
	    	}
	    	
	    	if($("#thh").val()==""||$("#thh").val()==undefined){
	    		alertify.error("Please enter the End Time");
	    		return;
	    	}
	    	if($("#tmin").val()==""||$("#tmin").val()==undefined){
	    		alertify.error("Please enter the End Time");
	    		return;
	    	}
	    	
	    	if($("#tampm").val()==""||$("#tampm").val()==undefined){
	    		alertify.error("Please enter the End Time");
	    		return;
	    	}
	    	
	    	
	    	if($scope.isFullDay==""||$scope.isFullDay==undefined){
	    		alertify.error("Please Select its Full Day Session or not");
	    		return;
	    	}
	    	
 			var serverPath="admin/schoolsetup/saveSchoolSession";
 			
 			var input={"sessionName":$scope.sessionName,
 					  "fhh":$("#fhh").val(),
 					 "fmin":$("#fmin").val(),
 					"fampm":$("#fampm").val(),
 					"thh":$("#thh").val(),
 					"tmin":$("#tmin").val(),
 					"tampm":$("#tampm").val(),
 					"isFullDay":$scope.isFullDay};
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
 	        		 $scope.findSchoolSessions();
 	        	}
 	        	
 	        }).error(function (data, status, headers, config) {
 	        	
 	        });
 	    } ;   
 	    
 	   $scope.deleteSchoolSession=function(schoolSessionId){
			var serverPath="admin/schoolsetup/deleteschoolSession";
			
			var input={"schoolSessionId":schoolSessionId};
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
	        		 $scope.findSchoolSessions();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;  
 	   
 
	
	
	
 });

