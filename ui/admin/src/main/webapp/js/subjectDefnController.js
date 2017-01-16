angular.module('app')
.controller ('subjectDefnctrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile) {
    $scope.fetchSubject=function(){
    			var serverPath="admin/subject/fetchSubjects";
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
    	        		$("#subjectData").empty();
                          var results=JSON.parse(data.result);
    	        		   $scope.subjectData="";
    	        							$scope.subjectData+=" <table class='table' >";
    	        							$scope.subjectData+="     <thead>";
    	        							$scope.subjectData+="       <tr>";
    	        							$scope.subjectData+="         <th>Sl No</th>";
    	        							$scope.subjectData+="         <th>Subject Name</th>";
    	        							$scope.subjectData+="         <th>Subject Code</th>";
    	        							$scope.subjectData+="         <th>Delete</th>";
    	        							$scope.subjectData+="          <th>Edit</th>";
    	        							$scope.subjectData+="       </tr>";
    	        							$scope.subjectData+="     </thead>";
    	        							$scope.subjectData+="     <tbody>";
    	        							for (var int = 0; int < results.length; int++) {
    	        								var slno=int;
    	        								slno+=1
    	        								$scope.subjectData+="<tr>";
    	        								$scope.subjectData+="   <td>"+slno+"</td>";
    	        								$scope.subjectData+="   <td>"+results[int].subjectName+"</td>";
    	        								$scope.subjectData+="   <td>"+results[int].subjectCode+"</td>";
    	        								
    	        								$scope.subjectData+="   <td><input type='button' value='Edit' ng-click=\"openEditSubjectModal("+results[int].schoolSubjectId+")\" /></td>";
    	        								$scope.subjectData+="   <td><input type='button' value='Delete' ng-click=\"deleteSubject("+results[int].schoolSubjectId+")\" /></td>";
    	        								$scope.subjectData+=" </tr>";
    	        							}

    	        							$scope.subjectData+="     </tbody>";
    	        							$scope.subjectData+=" </table>";
    	        							var temp = $compile($scope.subjectData)($scope);
    	        							$("#subjectData").append(temp);
    	        							$scope.subjectName="";
    	        							$scope.subjectCode="";
    	        	}
    	        	
    	        }).error(function (data, status, headers, config) {
    	        	
    	        });
    	    } ;
    	    
    	$scope.openEditSubjectModal=function(schoolSubjectId){
    		$scope.findSchoolSubject(schoolSubjectId);
    		$("#subjectDefnModal").modal('show');
    	} 
    	
    	$scope.closeEditSubjectModal=function(){
    		$("#subjectDefnModal").modal('hide');
    	} 
    	    
      $scope.saveSubjectDefn=function(){
    	  if($scope.subjectName==""||$scope.subjectName==undefined){
    		  alertify.error("Please Enter SubjectName");
    		  return;
    	  }
    	  if($scope.subjectCode==""||$scope.subjectCode==undefined){
    		  alertify.error("Please Enter SubjectCode");
    		  return;
    	  }
    			var serverPath="admin/subject/saveSubject";
    			
    			var input={"subjectName":$scope.subjectName,"subjectCode":$scope.subjectCode};
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
    	        		$scope.fetchSubject();
    	        	}
    	        	
    	        }).error(function (data, status, headers, config) {
    	        	
    	        });
    	    } ; 
    	    
    	   $scope.updateSubject=function(){
    		   if($("#subjectNameforEdit").val()==""||$("#subjectNameforEdit").val()==undefined){
    	    		  alertify.error("Please Enter Subject Name");
    	    		  return;
    	    	  }
    	    	  if($("#subjectCodeforEdit").val()==""||$("#subjectCodeforEdit").val()==undefined){
    	    		  alertify.error("Please Enter Subject Code");
    	    		  return;
    	    	  }
      			var serverPath="admin/subject/saveSubject";
      			
      			var input={"schoolSubjectId":$rootScope.schoolSubjectIdForUpdate,"subjectName":$("#subjectNameforEdit").val(),"subjectCode":$("#subjectCodeforEdit").val()};
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
      	        		$scope.fetchSubject();
      	        		$scope.closeEditSubjectModal();
      	        	}
      	        	
      	        }).error(function (data, status, headers, config) {
      	        	
      	        });
      	    } ;   
    	    
    	    
    	 $scope.findSchoolSubject=function(schoolSubjectId){
    			var serverPath="admin/subject/findSchoolSubject";
    			var input={"schoolSubjectId":schoolSubjectId};
    			$http({
    	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
    	            method: "POST",
    	            params:{"input":JSON.stringify(input)} 

    	        }).success(function (data, status, headers, config) {
    	        	$rootScope.validateSession(data);
    	        	if(data.error=="true"){
    	        		alertify.error(data.message);
    	        	}else{
    	        		$("#subjectNameforEdit").val(data.subjectName);
    	        		$("#subjectCodeforEdit").val(data.subjectCode);
    	        		$rootScope.schoolSubjectIdForUpdate=data.schoolSubjectId;
    	        	}
    	        	
    	        }).error(function (data, status, headers, config) {
    	        	
    	        });
    	    } ; 	    
    	    
      $scope.deleteSubject=function(schoolSubjectId){
     			var serverPath="admin/subject/deleteSubject";
     			var input={"schoolSubjectId":schoolSubjectId};
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
     	        		$scope.fetchSubject();
     	        	}
     	        	
     	        }).error(function (data, status, headers, config) {
     	        	
     	        });
     	    } ; 	    
     	   $scope.fetchSubject();
    
	
	
	
 });

