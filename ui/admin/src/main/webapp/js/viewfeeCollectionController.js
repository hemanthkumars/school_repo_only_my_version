angular.module('app')
.controller ('viewFeeCollectionCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
	$timeout(enableDatePickerForFeeCollectionPage(),0);
	$scope.totalFeesCollected=0;
	$scope.resetFeeCollectionViewing1=function(){
		$("#fromDateFeeCollection").val("");
		$("#toDateFeeCollection").val("");
		$("#feeCollectionData").empty();
		$scope.totalFeesCollected=0;
	}
	
	$scope.resetFeeCollectionViewing2=function(){
		$("#toDateFeeCollection").val("");
		$("#feeCollectionData").empty();
		$scope.totalFeesCollected=0;
	}
	
	 $scope.findFeeCollection=function(){
		 if($("fromDateFeeCollection").val()==""||$("#fromDateFeeCollection").val()==undefined){
			 alertify.error("Please Enter the fromDate");
			 return ;
		 }
			var serverPath="admin/fee/findFeeCollection";
			var input={"fromDate":$("#fromDateFeeCollection").val(),"toDate":$("#toDateFeeCollection").val()};
			$http({
	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{"input":JSON.stringify(input)} 

	        }).success(function (data, status, headers, config) {
	        	$rootScope.validateSession(data);
	        	if(data.error=="true"){
	        		alertify.error(data.message);
	        	}else{
	        		$("#feeCollectionData").empty();
	        		$scope.totalFeesCollected=0;
                var results=JSON.parse(data.result);
	        		   $scope.feeCollectionData="";
	        							$scope.feeCollectionData+=" <table class='table' >";
	        							$scope.feeCollectionData+="     <thead>";
	        							$scope.feeCollectionData+="       <tr>";
	        							$scope.feeCollectionData+="         <th>Sl No</th>";
	        							$scope.feeCollectionData+="         <th>Name</th>";
	        							$scope.feeCollectionData+="         <th>Class </th>";
	        							$scope.feeCollectionData+="         <th>Receipt Date</th>";
	        							$scope.feeCollectionData+="          <th>Fee Amount</th>";
	        							$scope.feeCollectionData+="          <th>Payment Type</th>";
	        							$scope.feeCollectionData+="          <th>Other Details</th>";
	        							$scope.feeCollectionData+="          <th>Action</th>";
	        							$scope.feeCollectionData+="       </tr>";
	        							$scope.feeCollectionData+="     </thead>";
	        							$scope.feeCollectionData+="     <tbody>";
	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1
	        								$scope.feeCollectionData+="<tr>";
	        								$scope.feeCollectionData+="   <td>"+slno+"</td>";
	        								$scope.feeCollectionData+="   <td>"+results[int][2]+"</td>";
	        								$scope.feeCollectionData+="   <td>"+results[int][3]+"</td>";
	        								var receiptDate=new Date(results[int][4]);
	        								$scope.feeCollectionData+="   <td>"+receiptDate.toDateString()+"</td>";
	        								$scope.totalFeesCollected+=results[int][0];
	        								$scope.feeCollectionData+="   <td>"+results[int][0]+"</td>";
	        								$scope.feeCollectionData+="   <td>"+results[int][6]+"</td>";
	        								if(results[int][7]==null){
	        									$scope.feeCollectionData+="<td>-</td>";
	        								}else{
	        									$scope.feeCollectionData+="   <td>"+results[int][7]+"</td>";
	        								}
	        								
	        								$scope.feeCollectionData+="   <td><input type='button' value='View ' ng-click=\"payFees("+results[int][3]+")\" /></td>";
	        								$scope.feeCollectionData+=" </tr>";
	        							}

	        							$scope.feeCollectionData+="     </tbody>";
	        							$scope.feeCollectionData+=" </table>";
	        							var temp = $compile($scope.feeCollectionData)($scope);
	        							$("#feeCollectionData").append(temp);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
	    

 });

function enableDatePickerForFeeCollectionPage(){
	$("#fromDateFeeCollection").datepicker({ dateFormat: 'dd-mm-yy' });
	$("#toDateFeeCollection").datepicker({ dateFormat: 'dd-mm-yy' });
}

