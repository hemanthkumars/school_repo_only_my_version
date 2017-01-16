angular.module('app')
.controller ('smsTemplateCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
	   $scope.findSmsTemplateData=function(){
			var serverPath="admin/sms/findSmsTemplateData";
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
	        		$("#smsTemplateData").empty();
                     var results=JSON.parse(data.result);
	        		   $scope.smsTemplateData="";
	        							$scope.smsTemplateData+=" <table class='table' >";
	        							$scope.smsTemplateData+="     <thead>";
	        							$scope.smsTemplateData+="       <tr>";
	        							$scope.smsTemplateData+="         <th>Sl No</th>";
	        							$scope.smsTemplateData+="         <th>Template Name</th>";
	        							$scope.smsTemplateData+="         <th>Header</th>";
	        							$scope.smsTemplateData+="         <th>Footer</th>";
	        							$scope.smsTemplateData+="          <th>Delete</th>";
	        							$scope.smsTemplateData+="       </tr>";
	        							$scope.smsTemplateData+="     </thead>";
	        							$scope.smsTemplateData+="     <tbody>";
	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1;
	        								$scope.smsTemplateData+=" <tr>";
	        								$scope.smsTemplateData+="   <td>"+slno+"</td>";
	        								$scope.smsTemplateData+="   <td>"+results[int].smsTemplateName+"</td>";
	        								$scope.smsTemplateData+="   <td>"+results[int].header+"</td>";
	        								$scope.smsTemplateData+="   <td>"+results[int].footer+"</td>";
	        								$scope.smsTemplateData+="   <td><input type='button' value='Delete' ng-click=\"deleteSmsTemplate("+results[int].schoolSmsTemplateId+")\" /></td>";
	        								$scope.smsTemplateData+=" </tr>";
	        							}

	        							$scope.smsTemplateData+="     </tbody>";
	        							$scope.smsTemplateData+=" </table>";
	        							var temp = $compile($scope.smsTemplateData)($scope);
	        							$("#smsTemplateData").append(temp);
	        							$("#smsTemplateName").val("")
	        							$("#header").val("")
	        						    $("#footer").val("")
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
	    $scope.findSmsTemplateData();
	    
	    $scope.saveSmsTemplate=function(){
	    	if($("#smsTemplateName").val()==""||$("#smsTemplateName").val()==undefined){
	    		alertify.error("Enter Template Name");
	    		return;
	    	}
	    	if($("#header").val()==""||$("#header").val()==undefined){
	    		alertify.error("Enter Header ");
	    		return;
	    	}
	    	if($("#footer").val()==""||$("#footer").val()==undefined){
	    		alertify.error("Enter Footer");
	    		return;
	    	}
	    	
	    	
			var serverPath="admin/sms/saveSmsTemplateData";
			var input={"smsTemplateName":$("#smsTemplateName").val(),
					"header":$("#header").val(),
					"footer":$("#footer").val()};
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
	        		 $scope.findSmsTemplateData();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
	    $scope.deleteSmsTemplate=function(smsTemplateId){
	    	
			var serverPath="admin/sms/deleteSmsTemplate";
			var input={"smsTemplateId":smsTemplateId};
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
	        		 $scope.findSmsTemplateData();
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
 });

