angular.module('app')
.controller ('feeCollectCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$compile,$timeout) {
	$timeout(enableAutoCompleteForFeeCollect(),0);
	$scope.resetDataFeeCollect1=function(){
		$("#fcSchoolClassSection").val("");
    	$("#studentsData").empty();
    	$("#studentFeeDefinitionData").empty();
    	$("#studentFeeReceiptData").empty();
	}
    $scope.resetDataFeeCollect2=function(){
    	$("#fcStudentName").val("");
    	$("#studentsData").empty();
    	$("#studentFeeDefinitionData").empty();
    	$("#studentFeeReceiptData").empty();
	}

 });

var fcSchoolClassSectionId=0;
var studentIdSelected=0;
function enableAutoCompleteForFeeCollect(){
	$("#fcSchoolClassSection").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/class/fetchSchoolClassSectionLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#fcSchoolClassSection" ).val()},
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
           $( "#fcSchoolClassSection" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#fcSchoolClassSection" ).val( ui.item.label );
          // $( "#schoolClassSectionId" ).val( ui.item.value );
           fcSchoolClassSectionId=ui.item.value;
           findAllStudentDataForPaying(fcSchoolClassSectionId);
           
           return false;
        }
     })	;
	
	
	$("#fcStudentName").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/student/fetchStudentNameLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#fcStudentName" ).val()},
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
           $( "#fcStudentName" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#fcStudentName" ).val( ui.item.forInpuBox );
          // $( "#schoolClassSectionId" ).val( ui.item.value );
           studentIdSelected=ui.item.value;
           findSchoolFeeDefnForPaying(studentIdSelected);
           
           return false;
        }
     })	;
}
var schoolFeeIds=[];
function findSchoolFeeDefnForPaying(studentIdSelected){
    var input={"studentId":studentIdSelected};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/student/findSchoolDefnByStudentId;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		$("#studentFeeDefinitionData").empty();
        		var feeDefnData=JSON.parse(data.schoolFeeData);
        		var results=feeDefnData;
        		var studentData=JSON.parse(data.studentData);
        		 schoolFeeIds=data.schoolFeeIds;
        		
        		var studentFeeDefinitionData="";
        		studentFeeDefinitionData+=studentData.firstName+"  " ;
        		studentFeeDefinitionData+=studentData.schoolClassSectionId.code+"  ";
        		studentFeeDefinitionData+=studentData.fatherName+"  ";
        		studentFeeDefinitionData+=studentData.fatherMobile+"  ";
        		
        		studentFeeDefinitionData="";
        							studentFeeDefinitionData+=" <table class='table' >";
        							studentFeeDefinitionData+="     <thead>";
        							studentFeeDefinitionData+="       <tr>";
        							studentFeeDefinitionData+="         <th>Sl No</th>";
        							studentFeeDefinitionData+="         <th>Fee Type</th>";
        							studentFeeDefinitionData+="         <th>Fee Amount</th>";
        							studentFeeDefinitionData+="         <th>Paid Amount</th>";
        							studentFeeDefinitionData+="          <th>Balance Amount</th>";
        							studentFeeDefinitionData+="          <th>Paying Amount</th>";
        							studentFeeDefinitionData+="       </tr>";
        							studentFeeDefinitionData+="     </thead>";
        							studentFeeDefinitionData+="     <tbody>";
                                    var totalFees=0;
                                    var totalPaid=0;
                                    var totalBal=0;
        							for (var int = 0; int < results.length; int++) {
        								var slno=int;
        								slno+=1;
        								studentFeeDefinitionData+="<tr>";
        								studentFeeDefinitionData+="   <td>"+slno+"</td>";
        								studentFeeDefinitionData+="   <td>"+results[int].schoolFeeTypeId.feeType+"</td>";
        								studentFeeDefinitionData+="   <td>"+results[int].totalAmount+"</td>";
        								totalFees+=results[int].totalAmount;
        								studentFeeDefinitionData+="   <td>"+results[int].paidAmount+"</td>";
        								totalPaid+=results[int].paidAmount;
        								studentFeeDefinitionData+="   <td>"+results[int].balance+"</td>";
        								totalBal+=results[int].balance
        								if(results[int].schoolFeeTypeId.isConcessionType==1){
        									studentFeeDefinitionData+="   <td><input type='text' disabled='disabled' value='' class='form-control'  id="+results[int].schoolFeeId+"sfId"+" /></td>";
        								}else{
        									studentFeeDefinitionData+="   <td><input type='text' value='' class='form-control'  id="+results[int].schoolFeeId+"sfId"+" /></td>";
        								}
        								
        								studentFeeDefinitionData+=" </tr>";
        							}
        							studentFeeDefinitionData+="     </tbody>";
        							studentFeeDefinitionData+=" </table>";
        							studentFeeDefinitionData+=" Total Fee : "+totalFees+" ";
        							studentFeeDefinitionData+=" Total Paid: "+totalPaid+" ";
        							studentFeeDefinitionData+=" Total Bal : "+totalBal+" ";
        							studentFeeDefinitionData+=" <br/><input type='text' value='' id='paymentDetails' class='form-control' style='width: 180px;display: inline-block;' placeholder='Other Details like Cheque No etc..' />";
        							studentFeeDefinitionData+='  <select class="form-control"   id="paymentType"    style="width: 180px;display: inline-block;">';
        							studentFeeDefinitionData+='  <option value='+1+'>CASH</option>';
        							studentFeeDefinitionData+='  <option value='+2+'>CARD</option>';
        							studentFeeDefinitionData+='  <option value='+3+'>CHEQUE</option>';
        							studentFeeDefinitionData+='  </select>';
        							studentFeeDefinitionData+="   <input type='button' class='btn btn-primary' id='payFeeButton' value='Pay Fees' onclick=\"payFees()\" />";
        							
        							$("#studentFeeDefinitionData").append(studentFeeDefinitionData);
        							$("#studentDisplayInfo").empty();
        							$("#studentDisplayInfo").append(studentData.firstName+"  ( "+studentData.schoolClassSectionId.code+"  )");
        							
        							$("#payFeeModal").modal("show");
        							
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


function findAllStudentDataForPaying(fcSchoolClassSectionId){
    var input={"schoolClassSectionId":fcSchoolClassSectionId};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/student/findAllStudentDetailsFeeCollect;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		var results=JSON.parse(data.result);
        		populateStudentDataForPayment(results);
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

function populateStudentDataForPayment(results){
	var studentsData=""
		$("#studentsData").empty();
	if(results.length!=0){
          studentsData+="<input type='button' value='Bulk Fee Summary Print' onclick=\"bulkFeeSummaryPrint()\" />";
	}
		studentsData="";
							studentsData+=" <table class='table' >";
							studentsData+="     <thead>";
							studentsData+="       <tr>";
							studentsData+="         <th>Sl No</th>";
							studentsData+="         <th>Name</th>";
							studentsData+="         <th>Class</th>";
							studentsData+="          <th>Total Fees</th>";
							studentsData+="          <th>Total Paid</th>";
							studentsData+="          <th>Total Balance</th>";
							studentsData+="          <th>Pay</th>";
							studentsData+="          <th>Fee Summary</th>";
							studentsData+="          <th>Receipt</th>";
							studentsData+="       </tr>";
							studentsData+="     </thead>";
							studentsData+="     <tbody>";

							for (var int = 0; int < results.length; int++) {
								var slno=int;
								slno+=1;
								studentsData+=" <tr>";
								studentsData+="   <td>"+slno+"</td>";
								studentsData+="   <td>"+results[int][1]+"</td>";
								studentsData+="   <td>"+results[int][5]+"</td>";
								if(results[int][2]!=null){
									studentsData+="   <td>"+results[int][2]+"</td>";
									studentsData+="   <td>"+results[int][3]+"</td>";
									studentsData+="   <td>"+results[int][4]+"</td>";
								}else{
									studentsData+="   <td>No Fee Defined</td>";
									studentsData+="   <td>-</td>";
									studentsData+="   <td>-</td>";
								}
								
								studentsData+="   <td><input type='button' value='Pay' onclick=\"findSchoolFeeDefnForPaying("+results[int][0]+")\" /></td>";
								studentsData+="   <td><input type='button' value='Fee Summary' onclick=\"findFeeSummary("+results[int][0]+")\" /></td>";
								studentsData+="   <td><input type='button' value='Receipt' onclick=\"findReceiptDetails("+results[int][0]+")\" /></td>";
								studentsData+=" </tr>";
							}

							studentsData+="     </tbody>";
							studentsData+=" </table>";
							
							$("#studentsData").append(studentsData);
	
}



function payFees(){
	 
	  var schoofeeIdData=[];
	  var atleastOneFees=false;
	  for (var int = 0; int < schoolFeeIds.length; int++) {
		   var schoolFeePayingAmt=$("#"+schoolFeeIds[int]+"sfId").val();
		   if(schoolFeePayingAmt!=""){
			   atleastOneFees=true;
		   }
		   var schoolFeeJson={"schoolFeeId":schoolFeeIds[int] , "schoolFeePayingAmt":schoolFeePayingAmt};
		   schoofeeIdData.push(schoolFeeJson);
       }
	  if(!atleastOneFees){
		  alertify.error("Please fill  atleast one amount");
		  return;
	  }
	  var input={"schoolFeeArray":schoofeeIdData,"paymentTypeId":$("#paymentType").val()};
	    $.ajax({
	        dataType: "json",
	        type : 'POST',
	        url: 'admin/fee/payFees;jsessionid='+JSESSIONID,
	        data: {"input":JSON.stringify(input)} ,
	        success: function(data) {
	        	if(data.error=="false"){
	        		alertify.success(data.message);
	        		 findAllStudentDataForPaying(fcSchoolClassSectionId);
	        		$("#payFeeModal").modal("hide");
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

function findReceiptDetails(studentId){
	var input={"studentId":studentId};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/fee/findReceiptDetails;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		var results=JSON.parse(data.result);
        		
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




