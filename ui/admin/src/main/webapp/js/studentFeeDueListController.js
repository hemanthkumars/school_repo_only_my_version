angular.module('app')
.controller ('studentFeeDueListCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
	 $scope.findFeeDueList=function(){
			var serverPath="admin/fee/findDueList";
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
	        		$("#feeDueListData").empty();
	        		$scope.balanceFees=0;
                   var results=JSON.parse(data.result);
	        		   $scope.feeDueListData="";
	        							$scope.feeDueListData+=" <table class='table' >";
	        							$scope.feeDueListData+="     <thead>";
	        							$scope.feeDueListData+="       <tr>";
	        							$scope.feeDueListData+="         <th>Sl No</th>";
	        							$scope.feeDueListData+="         <th>Name</th>";
	        							$scope.feeDueListData+="         <th>Class </th>";
	        							$scope.feeDueListData+="         <th>Father Name</th>";
	        							$scope.feeDueListData+="          <th>Father Mobile</th>";
	        							$scope.feeDueListData+="          <th>Total Fees</th>";
	        							$scope.feeDueListData+="          <th>Total Paid</th>";
	        							$scope.feeDueListData+="          <th>Total Balance</th>";
	        							$scope.feeDueListData+="          <th>Action</th>";
	        							$scope.feeDueListData+="       </tr>";
	        							$scope.feeDueListData+="     </thead>";
	        							$scope.feeDueListData+="     <tbody>";
	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1
	        								$scope.feeDueListData+="<tr>";
	        								$scope.feeDueListData+="   <td>"+slno+"</td>";
	        								$scope.feeDueListData+="   <td>"+results[int][4]+"</td>";
	        								$scope.feeDueListData+="   <td>"+results[int][7]+"</td>";
	        								$scope.feeDueListData+="   <td>"+results[int][5]+"</td>";
	        								$scope.feeDueListData+="   <td>"+results[int][6]+"</td>";
	        								$scope.feeDueListData+="   <td>"+results[int][0]+"</td>";
	        								$scope.feeDueListData+="   <td>"+results[int][1]+"</td>";
	        								$scope.feeDueListData+="   <td style='color: white;background-color: red;'>"+results[int][2]+"</td>";
	        								$scope.balanceFees+=results[int][2];
	        								$scope.feeDueListData+="   <td><input type='button' value='Pay' ng-click=\"payFees("+results[int][3]+")\" /></td>";
	        								$scope.feeDueListData+=" </tr>";
	        							}

	        							$scope.feeDueListData+="     </tbody>";
	        							$scope.feeDueListData+=" </table>";
	        							var temp = $compile($scope.feeDueListData)($scope);
	        							$("#feeDueListData").append(temp);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    
	    $scope.findFeeDueList();
 });

