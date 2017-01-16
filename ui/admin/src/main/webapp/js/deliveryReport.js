angular.module('app')
.controller ('deliveryReportCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile,$timeout) {
	$timeout(enabledatePickerForDeliveryReport(),0);
	$scope.resetDateForDelivery=function(){
		$("#smsSentDate").val("");
		$("#smsDeliveryData").empty();
	}
	 $scope.totalSms=0;
     $scope.totalCost=0;
	  $scope.findDeliveryData=function(){
		  if($("#smsSentDate").val()==''||$("#smsSentDate").val()==undefined){
			  alertify.error("Please enter the Date");
			  return;
		  }
			var serverPath="admin/sms/findDeliveryReport";
			var input={"sentDate":$("#smsSentDate").val()};
			alertify.success("Please Wait While we are fetching your data")
			$http({
	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{"input":JSON.stringify(input)} 

	        }).success(function (data, status, headers, config) {
	        	$rootScope.validateSession(data);
	        	if(data.error=="true"){
	        		alertify.error(data.message);
	        	}else{
	        		$("#smsDeliveryData").empty();
                    var results=JSON.parse(data.result);
                   
	        		   $scope.smsDeliveryData="";
	        							$scope.smsDeliveryData+=" <table class='table' >";
	        							$scope.smsDeliveryData+="     <thead>";
	        							$scope.smsDeliveryData+="       <tr>";
	        							$scope.smsDeliveryData+="         <th>Sl No</th>";
	        							$scope.smsDeliveryData+="         <th>Name</th>";
	        							$scope.smsDeliveryData+="         <th>Mobile No</th>";
	        							$scope.smsDeliveryData+="         <th style='width: 200px;'>Message</th>";
	        							$scope.smsDeliveryData+="         <th>Count</th>";
	        							$scope.smsDeliveryData+="         <th>Cost</th>";
	        							$scope.smsDeliveryData+="         <th>Status</th>";
	        							$scope.smsDeliveryData+="         <th>Sent At</th>";
	        							$scope.smsDeliveryData+="         <th>Received At</th>";
	        							$scope.smsDeliveryData+="       </tr>";
	        							$scope.smsDeliveryData+="     </thead>";
	        							$scope.smsDeliveryData+="     <tbody>";
	        							for (var int = 0; int < results.length; int++) {
	        								var slno=int;
	        								slno+=1
	        								$scope.smsDeliveryData+="<tr>";
	        								$scope.smsDeliveryData+="   <td>"+slno+"</td>";
	        								if(results[int][1]==null){
	        									$scope.smsDeliveryData+="   <td>-</td>";
	        								}else{
	        									$scope.smsDeliveryData+="   <td>"+results[int][1]+"</td>";
	        								}
	        								
	        								$scope.smsDeliveryData+="   <td>"+results[int][2]+"</td>";
	        								$scope.smsDeliveryData+="   <td style='width: 200px;'>"+results[int][4]+"</td>";
	        								$scope.totalSms+=results[int][6];
	        								$scope.smsDeliveryData+="   <td>"+results[int][6]+"</td>";
	        								$scope.totalCost+=results[int][5]
	        								$scope.smsDeliveryData+="   <td>Rs. "+results[int][5]+"</td>";
	        								$scope.smsDeliveryData+="   <td>"+results[int][9]+"</td>";
	        								$scope.smsDeliveryData+="   <td>"+results[int][7]+"</td>";
	        								if(results[int][8]==null||results[int][8]==undefined){
	        									$scope.smsDeliveryData+="   <td>-</td>";
	        								}else{
	        									$scope.smsDeliveryData+="   <td>"+results[int][8]+"</td>";
	        								}
	        								
	        								
	        								$scope.smsDeliveryData+=" </tr>";
	        							}

	        							$scope.smsDeliveryData+="     </tbody>";
	        							$scope.smsDeliveryData+=" </table>";
	        							var temp = $compile($scope.smsDeliveryData)($scope);
	        							$("#smsDeliveryData").append(temp);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    } ;
 });

function enabledatePickerForDeliveryReport(){
	$("#smsSentDate").datepicker({ dateFormat: 'dd-mm-yy' });
	
}

