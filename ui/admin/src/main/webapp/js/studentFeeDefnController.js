angular.module('app')
.controller ('studentFeeDefnCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile,$timeout) {
    $timeout(enableAutoCompleteForStudentFeeDefn(),0);
	   $scope.loadFeeTypeData=function(){
	    	//if($rootScope.feeTypeData!=undefined||$rootScope.feeTypeData!=""){
	    		var serverPath="admin/fee/fetchFeeType";
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
		        		$rootScope.feeTypes=JSON.parse(data.result);
		        	
		        	}
		        	
		        }).error(function (data, status, headers, config) {
		        	
		        });
	    //	}
			
	    }
	   $scope.loadFeeTypeData();
	   
	   $scope.resetDataFeeDefn=function(){
		   $scope.schoolClass="";
		   $("#studentFeeDefnData").empty();
		   $("#feeAmount").val('');
	   }

});
var schoolClassId=0;
function enableAutoCompleteForStudentFeeDefn(){
	$("#schoolClass").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/class/fetchSchoolClassLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#schoolClass" ).val()},
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
           $( "#schoolClass" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#schoolClass" ).val( ui.item.label );
          // $( "#schoolClassSectionId" ).val( ui.item.value );
           schoolClassId=ui.item.value;
           findAllSchoolFeeDefn(schoolClassId);
           
           return false;
        }
     })	;
}

function findAllSchoolFeeDefn(schoolClassId){
	   var input={"schoolClassId":schoolClassId};
	    $.ajax({
	        dataType: "json",
	        type : 'POST',
	        url: 'admin/fee/findAllSchoolFeeDefn;jsessionid='+JSESSIONID,
	        data: {"input":JSON.stringify(input)} ,
	        success: function(data) {
	        	if(data.error=="false"){
	        		var result=JSON.parse(data.result);
	        		populateStudentFeeDefnData(result)
	        		
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

function populateStudentFeeDefnData(studentFeeDefnjson){
	$("#studentFeeDefnData").empty();
	var studentDefnData="";
	studentDefnData+='   <input type="checkbox" checked="checked" onclick="checkAll123()" /> ALL ';
	  studentDefnData+=' <div class="panel-group" id="studentFeeDefnAccordion" >';
	  for (var int = 0; int < studentFeeDefnjson.length; int++) {
		  var containsFeeDefn=studentFeeDefnjson[int].containsFeeDefn;
		  studentIdMap[studentFeeDefnjson[int].studentId]=studentFeeDefnjson[int].studentId;
		  studentIdBackUpMap[studentFeeDefnjson[int].studentId]=studentFeeDefnjson[int].studentId;
		  
	  studentDefnData+='     <div class="panel panel-default">';
	  studentDefnData+='       <div class="panel-heading">';
	  studentDefnData+='         <h4 class="panel-title">';
	  studentDefnData+='   <input type="checkbox" checked="checked" class="fullStudentDivClass" onclick="studentAddRemoveInArray('+studentFeeDefnjson[int].studentId+')" />  ';
	  if(containsFeeDefn==1){
		  studentDefnData+=' <a  style="cursor: pointer;" onclick="openAccordionStuFeeDefn('+studentFeeDefnjson[int].studentId+')">'+studentFeeDefnjson[int].studentName+' ('+studentFeeDefnjson[int].classSection+')  Total Fees : '+studentFeeDefnjson[int].totalFees+' Total Paid : '+studentFeeDefnjson[int].totalPaid+' Total Balance : '+studentFeeDefnjson[int].totalBal+'</a>';
	  }else{
		  studentDefnData+=' <a  style="cursor: pointer;" onclick="openAccordionStuFeeDefn('+studentFeeDefnjson[int].studentId+')">'+studentFeeDefnjson[int].studentName+' No Fee Defined Yet '+'</a>';
	  }
	  
	  studentDefnData+='         </h4>';
	  studentDefnData+='       </div>';
	  studentDefnData+='       <div id="'+studentFeeDefnjson[int].studentId+'" class="panel-collapse collapse">';
	  studentDefnData+='         <div class="panel-body">';
	  alreadyDefndData="";
		alreadyDefndData+=" <table class='table' >";
		alreadyDefndData+="     <thead>";
		alreadyDefndData+="       <tr>";
		alreadyDefndData+="         <th>Sl No</th>";
		alreadyDefndData+="         <th>Fee Type</th>";
		alreadyDefndData+="         <th>Fee Amount</th>";
		alreadyDefndData+="         <th>Paid</th>";
		alreadyDefndData+="         <th>Balance</th>";
		alreadyDefndData+="         <th>View</th>";
		alreadyDefndData+="         <th>Edit</th>";
		alreadyDefndData+="         <th>Delete</th>";
		alreadyDefndData+="       </tr>";
		alreadyDefndData+="     </thead>";
		alreadyDefndData+="     <tbody>";
		var feeDefnLocal=studentFeeDefnjson[int].feeDefnArray;
		if(containsFeeDefn==1){
			for (var int2 = 0; int2 < feeDefnLocal.length; int2++) {
				var slno=int2;
				slno+=1
				alreadyDefndData+="<tr>";
				alreadyDefndData+="   <td>"+slno+"</td>";
				alreadyDefndData+="   <td>"+feeDefnLocal[int2].feeType+"</td>";
				alreadyDefndData+="   <td>"+feeDefnLocal[int2].feeAmount+"</td>";
				alreadyDefndData+="   <td>"+feeDefnLocal[int2].paid+"</td>";
				alreadyDefndData+="   <td>"+feeDefnLocal[int2].balance+"</td>";
				alreadyDefndData+="   <td><input type='button' value='Receipt' onclick=\"viewReceipt("+feeDefnLocal[int2].schoolFeeId+")\" /></td>";
				alreadyDefndData+="   <td><input type='button' value='Edit' onclick=\"openEditFeeDefn("+feeDefnLocal[int2].schoolFeeId+")\" /></td>";
				alreadyDefndData+="   <td><input type='button' value='Delete' onclick=\"deleteFeeDefn("+feeDefnLocal[int2].schoolFeeId+")\" /></td>";
				alreadyDefndData+=" </tr>";
			}
		}else{
			alreadyDefndData+="<tr>";
			alreadyDefndData+="   <td>No Fees Defined Yet</td>";
			alreadyDefndData+=" </tr>";
		}

		alreadyDefndData+="     </tbody>";
		alreadyDefndData+=" </table>";
		studentDefnData+=alreadyDefndData;
	  studentDefnData+='         </div>';
	  studentDefnData+='       </div>';
	  studentDefnData+='     </div>';
	  studentDefnData+='   ';
	  }
	  studentDefnData+='   </div> ';
	  checkAll=1;
	  $("#studentFeeDefnData").append(studentDefnData);
}

var studentDatadivMap={};

function openAccordionStuFeeDefn(divToOpen){
	if(divToOpen in studentDatadivMap){
		$('#'+divToOpen+'').attr('class', '');
		$('#'+divToOpen+'').attr('class', 'panel-collapse collapse');
		delete studentDatadivMap[divToOpen];
	}else{
		studentDatadivMap[divToOpen]=divToOpen;
		$('#'+divToOpen+'').attr('class', 'panel-collapse collapse in');
	}
}

var studentIdMap={};
var studentIdBackUpMap={};
function studentAddRemoveInArray(studentId){
	if(studentId in studentIdMap){
		delete studentIdMap[studentId];
	}else{
		studentIdMap[studentId]=studentId;
	}
}



function openEditFeeDefn(studentId){
	
}

function deleteFeeDefn(schoolFeeId){
	 var input={"schoolFeeId":schoolFeeId};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/fee/deleteStudentFeeDefn;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		alertify.success(data.message);
        		findAllSchoolFeeDefn(schoolClassId);
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
var checkAll=1;
function checkAll123(){
	if(checkAll==1){
		$('.fullStudentDivClass').each(function(){
			$(this).removeAttr('checked');
		 });
		
		studentIdMap={};
		checkAll=0;
	}else{
		checkAll=1;
		for (var m in studentIdBackUpMap){
			studentIdMap[m]=m;
		}
		$('.fullStudentDivClass').each(function(){
			//$(this).attr('checked');
			$(this).prop('checked', true);
		 });
	
		
	}
}


function saveFeeDefn(){
	  if($("#schoolFeeType").val()==""||$("#schoolFeeType").val()==undefined){
		  alertify.error("Please Select Fee Type");
		  return;
	  }
	  if($("#schoolClass").val()==""||$("#schoolClass").val()==undefined){
		  alertify.error("Please Choose the Class");
		  return;
	  }
	  if($("#feeAmount").val()==""||$("#feeAmount").val()==undefined||$("#feeAmount").val()==0){
		  alertify.error("Enter the Fee amount");
		  return;
	  }
	  var studentIdArray=[];
		var loop=0;
		var containsStudentIds=false;
		for (var m in studentIdMap){
			var temp={"studentId":m};
			studentIdArray.push(temp);
			containsStudentIds=true;
		}
		if(!containsStudentIds){
			alertify.error("Please select atleast one student to save");
            return;
		}
	  var input={"schoolFeeTypeId":$("#schoolFeeType").val(),
			  "schoolClassId":$("#schoolClass").val(),
			  "feeAmount":$("#feeAmount").val(),
			  "studentIdArray":studentIdArray};
	  alertify.success("Please Wait While we are saving the Fee Data");
	    $.ajax({
	        dataType: "json",
	        type : 'POST',
	        url: 'admin/fee/saveStudentFeeDefn;jsessionid='+JSESSIONID,
	        data: {"input":JSON.stringify(input)} ,
	        success: function(data) {
	        	if(data.error=="false"){
	        		alertify.success(data.message);
	        		findAllSchoolFeeDefn(schoolClassId);
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



