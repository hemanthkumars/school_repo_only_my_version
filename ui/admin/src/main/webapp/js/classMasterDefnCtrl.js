angular.module('app')
.controller ('classMasterDefnCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile) {
alertify.success("inside classMasterDefnCtrl " );
   
    $scope.saveClassDefn=function(){
    	if($scope.className==""||$scope.className==undefined){
    		alertify.error("Please Enter ClassName");
    		return;
    	}
    	if($scope.classCode==""||$scope.classCode==undefined){
    		alertify.error("Please Enter Class Code");
    		return;
    	}
    	
    	
		var serverPath="admin/class/saveClassDefinition";
		var input={"className":$scope.className,"classCode":$scope.classCode};
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
        		$scope.fetchClassDefinition();
        	}
        	
        }).error(function (data, status, headers, config) {
        	
        });
    }
    
    $scope.deleteClassMaster=function(schoolClassId){
		var serverPath="admin/class/deleteClassDefinition";
		var input={"schoolClassId":schoolClassId};
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
        		$scope.fetchClassDefinition();
        	}
        	
        }).error(function (data, status, headers, config) {
        	
        });
    }
    
    

	$scope.fetchClassDefinition=function(){
		var serverPath="admin/class/fetchClassDefinition";
		var input={};
		$http({
            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
            method: "POST",
            params:{"input":JSON.stringify(input)} 

        }).success(function (data, status, headers, config) {
        	$rootScope.validateSession(data);
        	if(data.error=="true"){
				alertify.error(data.message);
				return;
			}else {
				$scope.className="";
				$scope.classCode="";
				console.log(data.result);
				var results=JSON.parse(data.result);
				$("#classMasterData").empty();
				console.log(results);
				$scope.classMasterData="";
				$scope.classMasterData+=" <table class='table' >";
				$scope.classMasterData+="     <thead>";
				$scope.classMasterData+="       <tr>";
				$scope.classMasterData+="         <th>Sl No</th>";
				$scope.classMasterData+="         <th>Class Name</th>";
				$scope.classMasterData+="         <th>Code</th>";
				/*$scope.classMasterData+="         <th>Order</th>";*/
				$scope.classMasterData+="          <th>Action</th>";
				$scope.classMasterData+="       </tr>";
				$scope.classMasterData+="     </thead>";
				$scope.classMasterData+="     <tbody>";

				for (var int = 0; int < results.length; int++) {
					var slno=int;
					slno+=1;
					$scope.classMasterData+="<tr>";
					$scope.classMasterData+="   <td>"+slno+"</td>";
					$scope.classMasterData+="   <td>"+results[int].className+"</td>";
					$scope.classMasterData+="   <td>"+results[int].classCode+"</td>";
					/*$scope.classMasterData+="   <td>"+results[int].order+"</td>";*/
					$scope.classMasterData+="   <td><input type='button' value='Delete' ng-click=\"deleteClassMaster("+results[int].schoolClassId+")\" onclick='deleteClassMaster()' /></td>";
					$scope.classMasterData+=" </tr>";
				}

				$scope.classMasterData+="     </tbody>";
				$scope.classMasterData+=" </table>";
				var temp = $compile($scope.classMasterData)($scope);
				$("#classMasterData").append(temp);
			}
        }).error(function (data, status, headers, config) {
        	
        });
	}
	
	$scope.fetchClassDefinition();
	
 });




