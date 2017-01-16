angular.module('app')
.controller ('academicYearCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
	alertify.success("academicYearCtrl");
	$timeout(enableDatePicker(), 0);
	
	   $scope.fetchSchoolAcademicYear=function(){
	    	
			var serverPath="admin/schoolsetup/fetchSchoolAcademicYear";
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
	        		var results=JSON.parse(data.result);
	        		$("#schoolAcademicYearData").empty();
	        		$scope.schoolAcademicYearData="";
	        							$scope.schoolAcademicYearData+=" <table class='table' >";
	        							$scope.schoolAcademicYearData+="     <thead>";
	        							$scope.schoolAcademicYearData+="       <tr>";
	        							$scope.schoolAcademicYearData+="         <th>Sl No</th>";
	        							$scope.schoolAcademicYearData+="         <th>Year</th>";
	        							$scope.schoolAcademicYearData+="         <th>Start Date</th>";
	        							$scope.schoolAcademicYearData+="         <th>End Date</th>";
	        							$scope.schoolAcademicYearData+="          <th>Delete</th>";
	        							$scope.schoolAcademicYearData+="          <th>Delete</th>";
	        							$scope.schoolAcademicYearData+="       </tr>";
	        							$scope.schoolAcademicYearData+="     </thead>";
	        							$scope.schoolAcademicYearData+="     <tbody>";

	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1;
	        								var isCurrentYear=results[int].currentYearMark;
	        								var changeToStatus=0;
	        								var activeInactive=""
	        								if(isCurrentYear==0){
	        									activeInactive="Activate";
	        									changeToStatus=1;
	        								}else{
	        									activeInactive="InActivate"
	        										changeToStatus=0;
	        								}
	        								$scope.schoolAcademicYearData+="<tr>";
	        								$scope.schoolAcademicYearData+="   <td>"+slno+"</td>";
	        								$scope.schoolAcademicYearData+="   <td>"+results[int].academicYearId.academicYear+"</td>";
	        								var startd = new Date(results[int].startDate);
	        								var endd = new Date(results[int].endDate);
	        								$scope.schoolAcademicYearData+="   <td>"+startd.toDateString()+"</td>";
	        								$scope.schoolAcademicYearData+="   <td>"+endd.toDateString()+"</td>";
	        								if(isCurrentYear==0){
	        									$scope.schoolAcademicYearData+="   <td><input type='button' value='"+activeInactive+"' ng-click=\"changeAcademicYearStatus("+results[int].schoolAcademicYearId+","+changeToStatus+")\" /></td>";	
	        								}else{
	        									$scope.schoolAcademicYearData+="   <td>Currently Active</td>";
	        								}
	        								
	        								$scope.schoolAcademicYearData+="   <td><input type='button' value='Delete' ng-click=\"deleteSchoolAcademicYear("+results[int].schoolAcademicYearId+")\" /></td>";
	        								$scope.schoolAcademicYearData+=" </tr>";
	        							}

	        							$scope.schoolAcademicYearData+="     </tbody>";
	        							$scope.schoolAcademicYearData+=" </table>";
	        							var temp = $compile($scope.schoolAcademicYearData)($scope);
	        							$("#schoolAcademicYearData").append(temp);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	   $scope.fetchSchoolAcademicYear();
	 
	   
	   $scope.changeAcademicYearStatus=function(schoolAcademcYearId,changeToStatus){
		  
			var serverPath="admin/schoolsetup/changeAcademicYearStatus";
			var input={"schoolAcademicYearId":schoolAcademcYearId};
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
	        		 $scope.fetchSchoolAcademicYear();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	   }
	   
	   $scope.deleteSchoolAcademicYear=function(schoolAcademcYearId){

			var serverPath="admin/schoolsetup/deleteAcademicYear";
			var input={"schoolAcademicYearId":schoolAcademcYearId};
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
	        		 $scope.fetchSchoolAcademicYear();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	   }
	   
	   $scope.saveAcademicYear=function(){
		   
		   if($("#startDate").val()==undefined||$("#startDate").val()==""){
			   alertify.error("Please Enter the Start Date");
			   return;
		   }
		   if($("#endDate").val()==undefined||$("#endDate").val()==""){
			   alertify.error("Please Enter the End Date");
			   return;
		   }
		   
		   if($("#academicYearId").val()==undefined||$("#academicYearId").val()==""){
			   alertify.error("Please Select a year");
			   return;
		   }
		   
		   
			var serverPath="admin/schoolsetup/saveAcademicYear";
			var input={"startDate":$("#startDate").val(),"endDate":$("#endDate").val(),"academicYearId":$("#academicYearId").val()};
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
	        		$scope.fetchSchoolAcademicYear();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
		   
	   }
	

 });

function enableDatePicker(){
	$("#startDate").datepicker({ dateFormat: 'dd-mm-yy' });
	$("#endDate").datepicker({ dateFormat: 'dd-mm-yy' });
}

