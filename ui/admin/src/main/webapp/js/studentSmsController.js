angular.module('app')
.controller ('studentSmsCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
	$timeout(enableAutoCompleteForStudentSMS(),0);
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

var studentIdMapForSMS={};
var studentIdMapForSMSBackUp={};

var classOrSectionId="";

function enableAutoCompleteForStudentSMS(){
	$("#message").val("");
	$("#classNameForSms").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/class/findClassAndClassSectionLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#classNameForSms" ).val()},
                success: function(data) {
                	if(data.error=="false"){
                		var res=JSON.parse(data.result);
                		nameInputData=res;
                   	 response(res);
                	}else{
                		if(data.errorCode!=undefined){
                			alertify.error(data.message);
                			location.href="#/login";
                		}
                	}
                	
                },
                error: function(data) {
                  //  $('input.suggest-user').removeClass('ui-autocomplete-loading');  
                }
            });
        },
        focus: function( event, ui ) {
           $( "#classNameForSms" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#classNameForSms" ).val( ui.item.label );
          // $( "#schoolClassSectionId" ).val( ui.item.value );
           classOrSectionId=ui.item.value;
           findAllStudentDataForSMS(classOrSectionId);
           
           return false;
        }
     })	;
}


function findAllStudentDataForSMS(classOrSectionId){
    var input={"classOrSectionId":classOrSectionId};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/student/findStudentForClassOrSection;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		var results=JSON.parse(data.result);
        		$("#studentDataForSms").empty();
        		studentIdMapForSMS={};
        		  var studentDataForSms="";
        		      studentDataForSms+=" <input type='checkbox' checked='checked' id='smsAllCheckbox' onclick='checkAllStudentSMS213()'/>All";
        							studentDataForSms+=" <table class='table' >";
        							studentDataForSms+="     <thead>";
        							studentDataForSms+="       <tr>";
        							studentDataForSms+="         <th>Sl No</th>";
        							studentDataForSms+="         <th>Select</th>";
        							studentDataForSms+="         <th>Student Name</th>";
        							studentDataForSms+="         <th>Class</th>";
        							studentDataForSms+="         <th>Father Name</th>";
        							studentDataForSms+="         <th>Father Mobile</th>";
        							studentDataForSms+="       </tr>";
        							studentDataForSms+="     </thead>";
        							studentDataForSms+="     <tbody >";
        							for (var int = 0; int < results.length; int++) {
        								var slno=int;
        								slno+=1;
        								studentDataForSms+="<tr>";
        								studentDataForSms+="   <td>"+slno+"</td>";
        								studentDataForSms+="   <td><input type='checkbox' class='allCheckBoxForstudentSms' checked='checked' onclick='removeOrAddSmsStudentIdFromMap("+results[int][0]+")' id="+results[int][0]+" /></td>";
        								studentDataForSms+="   <td>"+results[int][1]+"</td>";
        								studentDataForSms+="   <td>"+results[int][4]+"</td>";
        								studentDataForSms+="   <td>"+results[int][3]+"</td>";
        								studentDataForSms+="   <td>"+results[int][2]+"</td>";
        								studentDataForSms+=" </tr>";
        								
        								studentIdMapForSMS[results[int][0]]=results[int][0];
        								studentIdMapForSMSBackUp[results[int][0]]=results[int][0];
        								checkAllStudentSMS=1;
        								
        							}
        							studentDataForSms+="     </tbody>";
        							studentDataForSms+=" </table>";
        							
        							$("#studentDataForSms").append(studentDataForSms);
        							
        							
        	}else{
        		if(data.errorCode!=undefined){
        			alertify.error(data.message);
        			location.href="#/login";
        		}
        		alertify.error(data.message);
        	}
        	
        },
        error: function(data) {
          //  $('input.suggest-user').removeClass('ui-autocomplete-loading');  
        }
    });
	
}

function removeOrAddSmsStudentIdFromMap(studentId){
	if(studentId in studentIdMapForSMS){
		delete studentIdMapForSMS[studentId];
	}else{
		studentIdMapForSMS[studentId]=studentId;
	}
}



function checkAllStudentSMS213(){
	if(checkAllStudentSMS==1){
		$('.allCheckBoxForstudentSms').each(function(){
			$(this).removeAttr('checked');
		 });
		
		studentIdMapForSMS={};
		checkAllStudentSMS=0;
	}else{
		checkAllStudentSMS=1;
		for (var m in studentIdMapForSMSBackUp){
			studentIdMapForSMS[m]=m;
		}
		$('.allCheckBoxForstudentSms').each(function(){
			//$(this).attr('checked');
			$(this).prop('checked', true);
		 });
	
		
	}
}

var checkAllStudentSMS=1;
$("#message").val("");
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
	var containsStudentIds=false;
	var studentIdArrayForSms=[];
	for (var m in studentIdMapForSMS){
		var temp={"studentId":m};
		studentIdArrayForSms.push(temp);
		containsStudentIds=true;
	}
	if(!containsStudentIds){
		alertify.error("Please select atleast one student to Send SMS");
        return;
	}
	
	if($("#templateName").val()==""||$("#templateName").val()==undefined){
		alertify.error("Please Select Template");
		return;
	}
	
	if($("#message").val()==""||$("#message").val()==undefined){
		alertify.error("Please Type Some message");
		return;
	}
	
    var input={"templateId":$("#templateName").val(),"message":$("#message").val(),"studentIdArray":studentIdArrayForSms};
    alertify.success("Please Wait");
    $('#sendSmsButton').attr('disabled', 'disabled'); 
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/sms/sendStudentSms;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		 alertify.success(data.message);
        		 $("#classNameForSms").val("");
        			$("#studentDataForSms").empty();
        			studentIdMapForSMS={};
        			studentIdMapForSMSBackUp={};
        		 $('#sendSmsButton').removeAttr('disabled');
        	}else{
        		if(data.errorCode!=undefined){
        			alertify.error(data.message);
        			location.href="#/login";
        		}
        		alertify.error(data.message);
        		$('#sendSmsButton').removeAttr('disabled');
        		$("#classNameForSms").val("");
        		$("#studentDataForSms").empty();
        		studentIdMapForSMS={};
        		studentIdMapForSMSBackUp={};
        	}
        	
        },
        error: function(data) {
          //  $('input.suggest-user').removeClass('ui-autocomplete-loading');  
        }
    });
}

