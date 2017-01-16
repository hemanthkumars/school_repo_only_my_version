angular.module('app')
.controller ('manageClassCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile,$timeout) {
	$scope.fetchSchoolClassSection=function(){
	    	
			var serverPath="admin/class/fetchSchoolClassSection";
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
	        		$("#schoolClassSectionData").empty();
	        		$scope.schoolClassSectionData="";
	        							$scope.schoolClassSectionData+=" <table class='table' >";
	        							$scope.schoolClassSectionData+="     <thead>";
	        							$scope.schoolClassSectionData+="       <tr>";
	        							$scope.schoolClassSectionData+="         <th>Sl No</th>";
	        							$scope.schoolClassSectionData+="         <th>Class</th>";
	        							$scope.schoolClassSectionData+="         <th>Class Section</th>";
	        							$scope.schoolClassSectionData+="         <th>Class Code</th>";
	        							$scope.schoolClassSectionData+="          <th>Delete</th>";
	        							
	        							$scope.schoolClassSectionData+="       </tr>";
	        							$scope.schoolClassSectionData+="     </thead>";
	        							$scope.schoolClassSectionData+="     <tbody>";

	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1;
	        								$scope.schoolClassSectionData+="<tr>";
	        								$scope.schoolClassSectionData+="   <td>"+slno+"</td>";
	        								$scope.schoolClassSectionData+="   <td>"+results[int].schoolClassId.className+"</td>";
	        								$scope.schoolClassSectionData+="   <td>"+results[int].schoolClassSectionName+"</td>";
	        								$scope.schoolClassSectionData+="   <td>"+results[int].code+"</td>";
	        								$scope.schoolClassSectionData+="   <td><input type='button' value='Delete' ng-click=\"deleteSchoolClassSection("+results[int].schoolClassSectionId+")\" /></td>";	
	        								$scope.schoolClassSectionData+=" </tr>";
	        							}

	        							$scope.schoolClassSectionData+="     </tbody>";
	        							$scope.schoolClassSectionData+=" </table>";
	        							
	        							var temp = $compile($scope.schoolClassSectionData)($scope);
	        							$("#schoolClassSectionData").append(temp);
	        							$scope.startSection="";
	        							$scope.endSection="";
	        							$scope.schoolClass="";
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	   
	   $scope.fetchSchoolClassSection();
	   
	    $scope.deleteSchoolClassSection=function(schoolClassSectionId){
			var serverPath="admin/class/deleteSchoolClassSection";
			var input={"schoolClassSectionId":schoolClassSectionId};
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
	        		 $scope.fetchSchoolClassSection();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	    
	    $scope.fetchAllSections=function(){
			var serverPath="admin/class/fetchAllSections";
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
	        		$scope.sectionss=JSON.parse(data.result);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	    
	    $scope.fetchAllSections();
	    
	    $scope.fetchAllSchoolClass=function(){
			var serverPath="admin/class/fetchAllSchoolClass";
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
	        		$scope.schoolClasss=JSON.parse(data.result);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	    
	    $scope.fetchAllSchoolClass();
	    
	    
	    $scope.generateSchoolClassSection=function(schoolClassSectionId){
	    	if($("#schoolClassId").val()==""||$("#schoolClassId").val()==undefined){
	    		alertify.error("Please Choose a Class");
	    		return;
	    	}
	    	if($("#startSectionId").val()==""||$("#startSectionId").val()==undefined){
	    		alertify.error("Please Choose Start Section");
	    		return;
	    	}
	    	if($("#endSectionId").val()==""||$("#endSectionId").val()==undefined){
	    		alertify.error("Please Choose End Section");
	    		return;
	    	}
	    	alertify.success("Please Wait While Classes are getting generated !");
			var serverPath="admin/class/generateSchoolClassSection";
			var input={"schoolClassId":$("#schoolClassId").val()
					  ,"startSectionId":$("#startSectionId").val(),
					  "endSectionId":$("#endSectionId").val()};
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
	        		 $scope.fetchSchoolClassSection();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }

 });



