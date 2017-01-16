angular.module('app')
.controller ('promoteReportCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile) {
   
	$scope.findPromotionReport=function(){
		$scope.academicYears="";
    	if($("#fromAcademic").val()==""||$("#fromAcademic").val()==undefined){
    		alertify.error("Please Select From Year");
    		return;
    	}
    	if($("#toAcademic").val()==""||$("#toAcademic").val()==undefined){
    		alertify.error("Please Select To Year");
    		return;
    	}
    	
    	
		var serverPath="admin/student/findPromotionReport";
		var input={"fromAcademicId":$("#fromAcademic").val(),"toAcademicId":$("#toAcademic").val()};
		alertify.success("Please Wait for few Seconds");
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
        		$scope.academicYears=data.academicYears;
        		$("#promotionReportData").empty();
        		console.log(results);
        		$scope.promotionData="";
        		$scope.promotionData+=" <table class='table' >";
        		$scope.promotionData+="     <thead>";
        		$scope.promotionData+="       <tr>";
        		$scope.promotionData+="         <th>Sl No</th>";
        		$scope.promotionData+="         <th>Class Name</th>";
        		$scope.promotionData+="         <th>Total No Students</th>";
        		$scope.promotionData+="          <th>Promoted</th>";
        		$scope.promotionData+="          <th>Not Promoted</th>";
        		$scope.promotionData+="       </tr>";
        		$scope.promotionData+="     </thead>";
        		$scope.promotionData+="     <tbody>";

        		for (var int = 0; int < results.length; int++) {
        			var slno=int;
        			slno+=1;
        			$scope.promotionData+="<tr>";
        			$scope.promotionData+="   <td>"+slno+"</td>";
        			$scope.promotionData+="   <td>"+results[int].className+"</td>";
        			$scope.promotionData+="   <td>"+results[int].total+"</td>";
        			$scope.promotionData+="   <td>"+results[int].promoted+"</td>";
        			$scope.promotionData+="   <td>"+results[int].notPromted+"</td>";
        			$scope.promotionData+=" </tr>";
        		}

        		$scope.promotionData+="     </tbody>";
        		$scope.promotionData+=" </table>";
        		var temp = $compile($scope.promotionData)($scope);
        		$("#promotionReportData").append(temp);
        		alertify.success(data.message);

        	}
        	
        }).error(function (data, status, headers, config) {
        	
        });
    }
	
	
 });

