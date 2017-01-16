angular.module('app')
.controller ('studentMgmtCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile,$timeout) {
	$timeout(enableAutoCompleteForStudent(),0);
	
	$scope.resetClassSectionData=function(){
		$("#schoolClassSectionId").val("");
		$scope.schoolClassSection="";
	}
	
	$scope.openAccordion=function(divToOpen){
		if(divToOpen in studentDatadivMap){
			$('#'+divToOpen+'').attr('class', '');
			$('#'+divToOpen+'').attr('class', 'panel-collapse collapse in');
			delete studentDatadivMap[divToOpen];
		}else{
			studentDatadivMap[divToOpen]=divToOpen;
			$('#'+divToOpen+'').attr('class', 'panel-collapse collapse');
		}
		
		
	};
	

	   $scope.loadStaticDataForStudent=function(){
	    	
			var serverPath="admin/student/fetchStaticData";
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
	        		var result=data.result;
	        		$rootScope.bloodGroups=JSON.parse(result.bloodGroups);
	        		$rootScope.languages=JSON.parse(result.languages);
	        		$rootScope.castes=JSON.parse(result.castes);
	        		$rootScope.religions=JSON.parse(result.religions);
	        		$rootScope.cities=JSON.parse(result.cities);
	        		$rootScope.countries=JSON.parse(result.countries);
	        		$rootScope.states=JSON.parse(result.states);
	        		$rootScope.genders=JSON.parse(result.genders);
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	   
	   $scope.saveStudentData=function(){
			var serverPath="admin/student/saveStudentData";
			if($("#studentFirstName").val()==""||$("#studentFirstName").val()==undefined){
				alertify.error("Student Name cannot be blank");
				return;
			}
			if($("#gender").val()==""){
				alertify.error("Please select gender");
				return;
			}
			var input={"studentFirstName":$("#studentFirstName").val(),
					"gender":$("#gender").val(),
					//"admissionDate":$scope.admissionDate,
					"dob":$("#dob").val(),
					"admissionNo":$("#admissionNo").val(),
					"bloodGroup":$("#bloodGroup").val(),
					"motherTongue":$("#motherTongue").val(),
					"caste":$("#caste").val(),
					"religion":$("#religion").val(),
					"identificationMark":$("#identificationMark").val(),
					"fatherName":$("#fatherName").val(),
					"fatherOccupation":$("#fatherOccupation").val(),
					"motherName":$("#motherName").val(),
					"motherOccupation":$("#motherOccupation").val(),
					"fatherMobile":$("#fatherMobile").val(),
					"fatherEmail":$("#fatherEmail").val(),
					"motherMobile":$("#motherMobile").val(),
					"motherEmail":$("#motherEmail").val(),
					"address":$("#address").val(),
					"landmark":$("#landmark").val(),
					"city":$("#city").val(),
					"state":$("#state").val(),
					"pincode":$("#pincode").val(),
					"country":$("#country").val(),
					"studentId":$("#studentId").val(),
					"schoolClassSectionId":$("#schoolClassSectionId").val()};
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
	        		findAllStudentDetails($( "#schoolClassSectionId" ).val());
	        		$("#studentAddEditModal").modal('hide');
	        		
	        	}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
	    }
	   
	   $scope.loadStaticDataForStudent();
	
  
 });
var studentDatadivArray=[];
var studentDatadivMap={};
function enableAutoCompleteForStudent(){
	$("#admissionDate").datepicker({ dateFormat: 'dd-mm-yy' });
	$("#dob").datepicker({ dateFormat: 'dd-mm-yy' });
	$("#schoolClassSection").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/class/fetchSchoolClassSectionLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#schoolClassSection" ).val()},
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
           $( "#schoolClassSection" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#schoolClassSection" ).val( ui.item.label );
           $( "#schoolClassSectionId" ).val( ui.item.value );
           
           var schoolClassSectionId=ui.item.value;
           findAllStudentDetails(schoolClassSectionId);
           
           return false;
        }
     })	;
}


function findAllStudentDetails(schoolClassSectionId){
    var input={"schoolClassSectionId":schoolClassSectionId};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/student/findAllStudentDetails;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		var results=JSON.parse(data.result);
        		populateStudentData(results);
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
}

function populateStudentData(results){
	var studentFullData=""
		$("#studentFullData").empty();
		studentFullData="";
							studentFullData+=" <table class='table' >";
							studentFullData+="     <thead>";
							studentFullData+="       <tr>";
							studentFullData+="         <th>Sl No</th>";
							studentFullData+="         <th>Class</th>";
							studentFullData+="         <th>Name</th>";
							studentFullData+="         <th>Gender</th>";
							studentFullData+="          <th>Date Of Birth</th>";
							studentFullData+="          <th>Father Name</th>";
							studentFullData+="          <th>Father Mobile</th>";
							studentFullData+="          <th>Mother Name</th>";
							studentFullData+="          <th>Edit</th>";
							studentFullData+="          <th>Delete</th>";
							studentFullData+="       </tr>";
							studentFullData+="     </thead>";
							studentFullData+="     <tbody>";

							for (var int = 0; int < results.length; int++) {
								var slno=int;
								slno+=1;
								studentFullData+="<tr>";
								studentFullData+="   <td>"+slno+"</td>";
								studentFullData+="   <td>"+results[int].schoolClassSectionId.code+"</td>";
								studentFullData+="   <td>"+results[int].firstName+"</td>";
								studentFullData+="   <td>"+results[int].genderId.gender+"</td>";
								var ms=results[int].dob;
								var dateofbirth=new Date(ms);
								studentFullData+="   <td>"+dateofbirth.toDateString()+"</td>";
								studentFullData+="   <td>"+results[int].fatherName+"</td>";
								studentFullData+="   <td>"+results[int].fatherMobile+"</td>";
								studentFullData+="   <td>"+results[int].motherName+"</td>";
								studentFullData+="   <td><input type='button' value='Edit' onclick=\"openStudentModalForEdition("+results[int].studentId+")\" /></td>";
								studentFullData+="   <td><input type='button' value='Delete' onclick=\"deleteStudent("+results[int].studentId+")\" /></td>";	
								studentFullData+=" </tr>";
							}

							studentFullData+="     </tbody>";
							studentFullData+=" </table>";
							
							$("#studentFullData").append(studentFullData);
	
}

function resetStudentData(){

	$("#studentFirstName").val("");
		$("#gender").val("");
	$("#dob").val("");
	$("#admissionNo").val("");
		$("#bloodGroup").val("");
		$("#motherTongue").val("");
	
		$("#caste").val("");
		$("#religion").val("");
	$("#fatherName").val("");
	$("#motherName").val("");
	$("#motherOccupation").val("");
	$("#fatherMobile").val("");
	$("#fatherEmail").val("");
	$("#motherMobile").val("");
	$("#motherEmail").val("");
	$("#address").val("");
	$("#landmark").val("");
		$("#city").val("");
		$("#state").val("");
	$("#pincode").val("");
		$("#country").val("");
		$('#studentInfodiv').attr('class', 'panel-collapse collapse in');
		$('#parentInfoDiv').attr('class', 'panel-collapse collapse in');
		$('#communiInfoDiv').attr('class', 'panel-collapse collapse in');
		$('#addressInfoDiv').attr('class', 'panel-collapse collapse in');
	

}


function deleteStudent(studentId){
	   var input={"studentId":studentId};
	    $.ajax({
	        dataType: "json",
	        type : 'POST',
	        url: 'admin/student/deleteStudent;jsessionid='+JSESSIONID,
	        data: {"input":JSON.stringify(input)} ,
	        success: function(data) {
	        	if(data.error=="false"){
	        		alertify.success(data.message);
	        		findAllStudentDetails($("#schoolClassSectionId").val());
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

function openStudentModalForEdition(studentId){
	resetStudentData();
	if(studentId==undefined){
		$("#studentId").val(0);
		if($("#schoolClassSectionId").val()==""||$("#schoolClassSectionId").val()==undefined){
			alertify.error("Please Select a Class to Continue");
			return;
		}
		
	}else{
		$("#studentId").val(studentId);
	}
	$("#studentAddEditModal").modal("show");
	if(studentId!=undefined){
	    var input={"studentId":studentId}
		$.ajax({
	        dataType: "json",
	        type : 'POST',
	        url: 'admin/student/findFullStudentDetails;jsessionid='+JSESSIONID,
	        data: {"input":JSON.stringify(input)},
	        success: function(data) {
	        	if(data.error=="false"){
	        		var studentData=JSON.parse(data.result);
	        		$("#studentFirstName").val(studentData.firstName);
	        		if(studentData.genderId!=undefined){
	        			$("#gender").val(studentData.genderId.genderId);
	        		}else{
	        			$("#gender").val("");
	        		}
	        		$("#dob").val(studentData.dobStr);
	        		$("#admissionNo").val(studentData.admissionNo);
	        		if(studentData.bloodGroupId!=undefined){
	        			$("#bloodGroup").val(studentData.bloodGroupId.bloodGroupId);
	        		}else{
	        			$("#bloodGroup").val("");
	        		}
	        		
	        		if(studentData.motherTongueId!=undefined){
	        			$("#motherTongue").val(studentData.motherTongueId.languageId);
	        		}else{
	        			$("#motherTongue").val("");
	        		}
	        		
	        		if(studentData.casteId!=undefined){
	        			$("#caste").val(studentData.casteId.casteId);
	        		}else{
	        			$("#caste").val("");
	        		}
	        		
	        		if(studentData.religionId!=undefined){
	        			$("#religion").val(studentData.religionId.religionId);
	        		}else{
	        			$("#religion").val("");
	        		}
	        		
	        		$("#fatherName").val(studentData.fatherName);
	        		$("#motherName").val(studentData.motherName);
	        		$("#motherOccupation").val(studentData.motherOccupation);
	        		$("#fatherMobile").val(studentData.fatherMobile);
	        		$("#fatherEmail").val(studentData.fatherEmail);
	        		$("#motherMobile").val(studentData.motherMobile);
	        		$("#motherEmail").val(studentData.motherEmail);
	        		$("#address").val(studentData.address);
	        		$("#landmark").val(studentData.landmark);
	        		if(studentData.cityId!=undefined){
	        			$("#city").val(studentData.cityId.cityId);
	        		}else{
	        			$("#city").val("");
	        		}
	        		
	        		if(studentData.stateId!=undefined){
	        			$("#state").val(studentData.stateId.stateId);
	        		}else{
	        			$("#state").val("");
	        		}
	        		$("#pincode").val(studentData.pincode);
	        		if(studentData.countryId!=undefined){
	        			$("#country").val(studentData.countryId.countryId);
	        		}else{
	        			$("#country").val("");
	        		}
	        		
	        		
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
	}
	
	

	
	
}