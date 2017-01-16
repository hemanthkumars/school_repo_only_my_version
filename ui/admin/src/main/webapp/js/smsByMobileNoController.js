angular.module('app')
.controller ('smsByMobileNoCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
	$timeout(clearTextarea(),0);
	calculateSMSCOunt();
	$scope.resetClassNameForSms=function(){
		$("#classNameForSms").val("");
		$("#studentDataForSms").empty();
		studentIdMapForSMS={};
		studentIdMapForSMSBackUp={};
	};
	var tempalteMap={};
	   $scope.fetchSmsTemplate=function(){
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
	        		var result=JSON.parse(data.result);
	        		for (var int = 0; int < result.length; int++) {
	        			tempalteMap[result[int].schoolSmsTemplateId]=result[int];
					}
	        		
	        		$rootScope.smsTemplates=result;
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	   $scope.fetchSmsTemplate();
	   
	   $scope.findTemplateDetails=function(templateId){
		   console.log(tempalteMap);
		   var result=tempalteMap[$("#templateName").val()];
		   if(result==undefined){
			   $scope.header="";
			   $scope.footer="";
		   }else{
			   $scope.header=result.header;
			   $scope.footer=result.footer;
		   }
		   
	   }
	

 });
function clearTextarea(){
	$("#message").val("");
	$("#mobileNosForSMSing").val("");
}

function calculateSMSCOunt(){
	var header=$("#header").val();
	var footer=$("#footer").val();
	
	var message=header+" "+$("#message").val()+" "+footer;
	/*var temp=$("#message").val();
	temp=temp.trim();
	$("#message").val(temp);*/
	
	var smsCount=0;
	if(message==undefined||message==""){
		smsCount=0;
	}else{
		var lengthOfMessage=message.length;
		smsCount=lengthOfMessage/160;
		if(smsCount<1){
			smsCount=1;
		}
		smsCount=Math.ceil(smsCount);
		
	}
	
	$("#smsCount").empty();
	$("#smsCount").append(smsCount);
	
}


function sendSms(){
	if($("#templateName").val()==""||$("#templateName").val()==undefined){
		alertify.error("Please Select Template");
		return;
	}
	
	if($("#message").val()==""||$("#message").val()==undefined){
		alertify.error("Please Type Some message");
		return;
	}
	
	if($("#mobileNosForSMSing").val()==""||$("#mobileNosForSMSing").val()==undefined){
		alertify.error("Enter atleast 1 mobile No");
		return;
	}
	
    var input={"templateId":$("#templateName").val(),"message":$("#message").val(),"mobileNosForSMSing":$("#mobileNosForSMSing").val()};
    alertify.success("Please Wait");
    $('#sendSmsButton').attr('disabled', 'disabled'); 
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/sms/sendSMSByMobileNo;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		 alertify.success(data.message);
        		 $("#mobileNosForSMSing").empty();
        		 $('#sendSmsButton').removeAttr('disabled');
        	}else{
        		if(data.errorCode!=undefined){
        			alertify.error(data.message);
        			location.href="#/login";
        		}
        		alertify.error(data.message);
        		$('#sendSmsButton').removeAttr('disabled');
        	}
        	
        },
        error: function(data) {
          //  $('input.suggest-user').removeClass('ui-autocomplete-loading');  
        }
    });

	
}

