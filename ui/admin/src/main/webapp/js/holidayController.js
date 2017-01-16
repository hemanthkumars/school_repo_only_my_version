angular.module('app')
.controller ('holidaydayctrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
	$timeout(enableholidayDate(), 0);
	  $scope.fetchCurrentAcademic=function(){
 			var serverPath="admin/schoolsetup/fetchCurrentAcademicYear";
 			
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
 	        		$scope.currentYear=data.currentYear;
 	        	}
 	        	
 	        }).error(function (data, status, headers, config) {
 	        	
 	        });
 	    } ;   
 	    
 	   $scope.fetchCurrentAcademic();
 	   
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
	        		$scope.schoolSessions=JSON.parse(data.result);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;  
	    
	    $scope.findSchoolSessions();
 	   
 	   
 	   
 	  $scope.fetchHolidays=function(){
			var serverPath="admin/schoolsetup/fetchHolidays";
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
	        		$("#holidayData").empty();
	        		var results=JSON.parse(data.result);
	        		   $scope.holidayData="";
	        							$scope.holidayData+=" <table class='table' >";
	        							$scope.holidayData+="     <thead>";
	        							$scope.holidayData+="       <tr>";
	        							$scope.holidayData+="         <th>Sl No</th>";
	        							$scope.holidayData+="         <th>Date</th>";
	        							$scope.holidayData+="         <th>Session</th>";
	        							$scope.holidayData+="         <th>Reason</th>";
	        							$scope.holidayData+="         <th>Delete</th>";
	        							$scope.holidayData+="       </tr>";
	        							$scope.holidayData+="     </thead>";
	        							$scope.holidayData+="     <tbody>";
	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1
	        								$scope.holidayData+="<tr>";
	        								$scope.holidayData+="   <td>"+slno+"</td>";
	        								var startd = new Date(results[int].holidayDate)
	        								$scope.holidayData+="   <td>"+startd.toDateString()+"</td>";
	        								$scope.holidayData+="   <td>"+results[int].schoolSessionId.sessionName+"</td>";
	        								$scope.holidayData+="   <td>"+results[int].reason+"</td>";
	        								$scope.holidayData+="   <td><input type='button' value='Delete' ng-click=\"deleteHoliday("+results[int].schoolHolidayId+")\" /></td>";
	        								$scope.holidayData+=" </tr>";
	        							}

	        							$scope.holidayData+="     </tbody>";
	        							$scope.holidayData+=" </table>";
	        							var temp = $compile($scope.holidayData)($scope);
	        							$("#holidayData").append(temp);
	        							$("#holidayDate").val('');
	        							$scope.schoolSession="";
	        							$scope.reason="";
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
	    $scope.fetchHolidays();
	    
	    $scope.saveHoliday=function(){
	    	
	    	if($("#holidayDate").val()==""||$("#holidayDate").val()==undefined){
	    		alertify.error("Please enter the Holiday Date");
	    		return;
	    	}
	    	if($("#schoolSessionId").val()==""||$("#schoolSessionId").val()==undefined){
	    		alertify.error("Select the Session ");
	    		return;
	    	}
	    	
	    	if($scope.reason==""||$scope.reason==undefined){
	    		alertify.error("Please enter the some reason");
	    		return;
	    	}
 			var serverPath="admin/schoolsetup/saveHoliday";
 			
 			var input={"holidayDate":$("#holidayDate").val(),"reason":$scope.reason,"schoolSessionId":$("#schoolSessionId").val()};
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
 	        		$scope.fetchHolidays();
 	        	}
 	        	
 	        }).error(function (data, status, headers, config) {
 	        	
 	        });
 	    } ;   
 	    
 	   $scope.deleteHoliday=function(schoolHoildayId){
			var serverPath="admin/schoolsetup/deleteHoliday";
			
			var input={"schoolHolidayId":schoolHoildayId};
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
	        		$scope.fetchHolidays();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;  
 	   
 });


function enableholidayDate(){
	$("#holidayDate").datepicker({ dateFormat: 'dd-mm-yy' });
}

