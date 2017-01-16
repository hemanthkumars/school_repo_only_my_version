angular.module('app')
.controller ('markingAttendanceCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout,$compile) {
   $timeout(enableAutoCompleteForMarkingAttendance(),0);
   
   $scope.findSchoolSessionsForAttendance=function(){
		var serverPath="admin/schoolsetup/findSchoolSessions";
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
       		$rootScope.schoolSessions=JSON.parse(data.result);
       	}
       	
       }).error(function (data, status, headers, config) {
       	
       });
   } ;
   
   $scope.findSchoolSessionsForAttendance();
   
   $scope.resetAttendanceSavingData=function(){
	   $("#studentAttendanceData").empty();
	   $scope.classOrSectionForMarkAttendance="";
//	 /  $scope.attendanceDate="";
	   
   }
   
 });

var schoolOrSectionId=0;

function enableAutoCompleteForMarkingAttendance(){
	$("#attendanceDate").datepicker({ dateFormat: 'dd-mm-yy' });
	
	$("#classOrSectionForMarkAttendance").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/class/findClassAndClassSectionLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#classOrSectionForMarkAttendance" ).val(),"ignoreAll":"yes"},
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
           $( "#classOrSectionForMarkAttendance" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#classOrSectionForMarkAttendance" ).val( ui.item.label );
          // $( "#schoolClassSectionId" ).val( ui.item.value );
           schoolOrSectionId=ui.item.value;
           findStudentAttendanceForMarking(schoolOrSectionId);
           return false;
        }
     })	;
}

function findStudentAttendanceForMarking(schoolOrSectionId){
	if($("#schoolSession").val()==""||$("#schoolSession").val()==undefined){
		alertify.error("Please Select Session For Attendance Marking");
		return;
	}
	
	if($("#attendanceDate").val()==""||$("#attendanceDate").val()==undefined){
		alertify.error("Please Select Date for Marking Attendance");
		return;
	}
	
	  var input={"classOrSectionId":schoolOrSectionId,
			  "attendanceDate":$("#attendanceDate").val(),
			  "schoolSessionId":$("#schoolSession").val()};
	   $.ajax({
	        dataType: "json",
	        type : 'POST',
	        url: 'admin/student/findStudentForClassOrSectionForAttendance;jsessionid='+JSESSIONID,
	        data: {"input":JSON.stringify(input)} ,
	        success: function(data) {
	        	if(data.error=="false"){
	        		alertify.success(data.message);
	        		populateStudentAttendanceData(JSON.parse(data.result));
	        		return;
	        		
	        	}else{
	        		if(data.errorCode!=undefined){
	        			alertify.error(data.message);
	        			location.href="#/login";
	        		}
	        		alertify.error(data.message);
	        		return;
	        	}
	        },
	        error: function(data) {
	          //  $('input.suggest-user').removeClass('ui-autocomplete-loading');  
	        }
	    });
}

var studentIdMapForAttendance={};
var studentIdMapForAttendanceBackup={};
var checkAllStudentAttendance=0;
function populateStudentAttendanceData(results){
	$("#studentAttendanceData").empty();
	  var studentAttendanceData="";
	      studentAttendanceData+=" <input type='checkbox' checked='checked' id='studentAttendanceAllCheckBox' onclick='checkAllStudentsForAttendance()'/>All";
						studentAttendanceData+=" <table class='table' >";
						studentAttendanceData+="     <thead>";
						studentAttendanceData+="       <tr>";
						studentAttendanceData+="         <th>Sl No</th>";
						studentAttendanceData+="         <th>Name</th>";
						studentAttendanceData+="         <th>Class</th>";
						studentAttendanceData+="         <th>Father Name</th>";
						studentAttendanceData+="         <th>Father Mobile</th>";
						studentAttendanceData+="         <th>Current Status</th>";
						studentAttendanceData+="         <th>Is Present?</th>";
						studentAttendanceData+="       </tr>";
						studentAttendanceData+="     </thead>";
						studentAttendanceData+="     <tbody >";
						for (var int = 0; int < results.length; int++) {
							var slno=int;
							slno+=1;
							studentAttendanceData+="<tr>";
							studentAttendanceData+="   <td>"+slno+"</td>";
							studentAttendanceData+="   <td>"+results[int][1]+"</td>";
							studentAttendanceData+="   <td>"+results[int][2]+"</td>";
							studentAttendanceData+="   <td>"+results[int][3]+"</td>";
							studentAttendanceData+="   <td>"+results[int][4]+"</td>";
							if(results[int][5]==0){
								studentAttendanceData+="   <td style='background: yellow;color: blue;'>Not Taken</td>";	
							}else{
								if(results[int][5]=='PRESENT'){
									studentAttendanceData+="   <td style='background: green;color: white;'>"+results[int][5]+"</td>";
								}else if(results[int][5]=='ABSENT'){
									studentAttendanceData+="   <td style='background: red;color: white;'>"+results[int][5]+"</td>";
								}
								
							}
							studentAttendanceData+="   <td><input type='checkbox' class='checkUncheckStudentForAttendanceClass' checked='checked' onclick='checkUncheckStudentForAttendance("+results[int][0]+")' id="+results[int][0]+" /></td>";
							studentAttendanceData+=" </tr>";
							
							studentIdMapForAttendance[results[int][0]]=results[int][0];
							studentIdMapForAttendanceBackup[results[int][0]]=results[int][0];
							checkAllStudentAttendance=1;
							
						}
						studentAttendanceData+="     </tbody>";
						studentAttendanceData+=" </table>";
						$("#studentAttendanceData").append(studentAttendanceData);
	
}

function checkUncheckStudentForAttendance(studentId){
	if(studentId in studentIdMapForAttendance){
		delete studentIdMapForAttendance[studentId];
	}else{
		studentIdMapForAttendance[studentId]=studentId;
	}
}

function checkAllStudentsForAttendance(){
	if(checkAllStudentAttendance==1){
		$('.checkUncheckStudentForAttendanceClass').each(function(){
			$(this).removeAttr('checked');
		 });
		
		studentIdMapForAttendance={};
		checkAllStudentAttendance=0;
	}else{
		checkAllStudentAttendance=1;
		for (var m in studentIdMapForAttendanceBackup){
			studentIdMapForAttendance[m]=m;
		}
		$('.checkUncheckStudentForAttendanceClass').each(function(){
			//$(this).attr('checked');
			$(this).prop('checked', true);
		 });
	}
}

function saveAttendance(){
	var containsStudentIds=false;
	var studentIdArrayForAttendance=[];
	for (var m in studentIdMapForAttendance){
		var temp={"studentId":m};
		studentIdArrayForAttendance.push(temp);
		containsStudentIds=true;
	}
	/*if(!containsStudentIds){
		alertify.error("Please select atleast one student to Send SMS");
        return;
	}*/
	
	if($("#schoolSession").val()==""||$("#schoolSession").val()==undefined){
		alertify.error("Please Select Session For Attendance Marking");
		return;
	}
	
	if($("#attendanceDate").val()==""||$("#attendanceDate").val()==undefined){
		alertify.error("Please Select Date for Marking Attendance");
		return;
	}
	
    var input={"attendanceDate":$("#attendanceDate").val(),"schoolSession":$("#schoolSession").val(),"studentIdArrayForAttendance":studentIdArrayForAttendance,
    		 "classOrSectionId":schoolOrSectionId};
    alertify.success("Please Wait");
    $('#saveAttendanceButton').attr('disabled', 'disabled'); 
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/attendance/saveAttendance;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		 alertify.success(data.message);
        			studentIdMapForAttendance={};
        			studentIdMapForAttendanceBackup={};
         		findStudentAttendanceForMarking(schoolOrSectionId);
         		 $('#saveAttendanceButton').removeAttr('disabled');
        	}else{
        		if(data.errorCode!=undefined){
        			alertify.error(data.message);
        			location.href="#/login";
        		}
        		alertify.error(data.message);
        		$('#saveAttendanceButton').removeAttr('disabled');
        		
        	}
        	
        },
        error: function(data) {
          //  $('input.suggest-user').removeClass('ui-autocomplete-loading');  
        }
    });
}

