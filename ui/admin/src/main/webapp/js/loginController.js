angular.module('app')
.controller ('loginController', function($scope,$rootScope,$stateParams,$http,$filter,$state) {
	$('#userName').focus();
	$rootScope.urlappend="http://localhost:8555/admin/";
	//$rootScope.urlappend="http://easybolt.in/bolt/";
	
	$rootScope.JSESSIONID="";
	$rootScope.schoolName="";
	$rootScope.schooolAddress="";
	$rootScope.schoolLogo="";
	
	$rootScope.validateSession=function(data){
		if(data.error=="true"){
			if(data.errorCode!=undefined){
				if(data.errorCode=="1"){
					alertify.error("Sorry Your Has Expired.Please Log In Again!");
					$state.go("login",{});
				}
			}
		}
	};
	   $rootScope.fetchAcademicYear=function(){
	    	
			var serverPath="admin/schoolsetup/fetchAcademicYear";
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
	        		$rootScope.academicYearRes=JSON.parse(data.result);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	
    $scope.login=function(){
    	if($scope.userName==''||$scope.userName==undefined){
    		alertify.error("Please enter the username");
    		$('#loginButton').removeAttr('disabled');
    		$scope.loadingImg=false;
    		return;
    	}
    	if($scope.password==''||$scope.password==undefined){
    		alertify.error("Please Enter the Password");
    		$('#loginButton').removeAttr('disabled');
    		$scope.loadingImg=false;
    		return;
    	}
    	console.log($scope.userName);
    	console.log($scope.password);
    	var input={"userName":$scope.userName,"password":$scope.password};
    	var serverPath="admin/login/authenticateLogin"
    		$scope.loadingImg=true;
    	$('#loginButton').attr('disabled', 'disabled');
    	 $http({
	            url: $rootScope.urlappend + serverPath+';jsessionid'+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{input: JSON.stringify(input)} 

	        }).success(function (data, status, headers, config) {
	        	$scope.loadingImg=false;
	        	if(data.error=="false"){
	        		alertify.success("Login Successfull!");
	        		$rootScope.JSESSIONID=data.JSESSIONID;
	        		JSESSIONID=data.JSESSIONID;
                    $("#menuGrid").show();
                    $rootScope.fetchAcademicYear();
	        		$state.go("dashboard",{});
	        	}else{
	        		alertify.error(data.message);
	        	}
	        	$('#loginButton').removeAttr('disabled');
	        }).error(function (data, status, headers, config) {
	        	$('#loginButton').removeAttr('disabled');
	        });
    	//$state.go("dashboard",{});
    	
    };
    
 
  
    
 });

//var urlappend="http://easybolt.in/bolt/";
var urlappend="http://localhost:8555/admin/";
var JSESSIONID="";
