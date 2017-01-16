angular.module('app')
.controller ('promotionCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout) {
	$scope.resetClassPromotion1=function(){
		fromSchoolClassSectionId=0;
		$("#fromClassPromotion").val("");
		studentIdMap={};
		$("#studentFullDataPromotion").empty();
	}
	$scope.resetClassPromotion2=function(){
		toSchoolClassSectionId=0;
		$("#toClassPromotion").val("");
		if($("#toClassPromotion").val()!=""){
			$("#studentFullDataPromotion").empty();
		}
		
	}
	
	
	
	$timeout(enableAutoCompleteForPromotion(),0);

 });

var fromSchoolClassSectionId=0;
var toSchoolClassSectionId=0;


var passedOut=0;

function enableAutoCompleteForPromotion(){
	$("#fromClassPromotion").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/class/fetchSchoolClassSectionLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#fromClassPromotion" ).val()},
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
           $( "#fromClassPromotion" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#fromClassPromotion" ).val( ui.item.label );
           //$( "#fromSchoolClassSectionId" ).val( ui.item.value );
           
           var schoolClassSectionId=ui.item.value;
           fromSchoolClassSectionId=schoolClassSectionId;
           findAllStudentDetailsPromotion(schoolClassSectionId);
           
           return false;
        }
     })	;
	
	$("#toClassPromotion").autocomplete({
        autofocus : true,
        minlength : 2,
        source:  function( request, response ) {
            $.ajax({
                dataType: "json",
                type : 'POST',
                url: 'admin/class/fetchSchoolClassSectionLike;jsessionid='+JSESSIONID,
                data: {"param":$( "#toClassPromotion" ).val()},
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
           $( "#toClassPromotion" ).val( ui.item.label );
              return false;
           },
        select: function( event, ui ) {
           $( "#toClassPromotion" ).val( ui.item.label );
           $( "#toSchoolClassSectionId" ).val( ui.item.value );
           /*
           var toSchoolClassSectionId=ui.item.value;
           findAllStudentDetails(toSchoolClassSectionId);*/
           toSchoolClassSectionId=ui.item.value ;
           
           return false;
        }
     })	;
	
	
}

function findAllStudentDetailsPromotion(schoolClassSectionId){
    var input={"schoolClassSectionId":schoolClassSectionId};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/student/findAllStudentDetails;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		var results=JSON.parse(data.result);
        		populateStudentDataPromotion(results);
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

function populateStudentDataPromotion(results){
	var studentFullData=""
		$("#studentFullDataPromotion").empty();
		studentFullData="";
							studentFullData+=" <table class='table' >";
							studentFullData+="     <thead>";
							studentFullData+="       <tr>";
							studentFullData+="         <th>Sl No</th>";
							studentFullData+="         <th>Class</th>";
							studentFullData+="         <th>Name</th>";
							studentFullData+="          <th>All<input type='checkbox' onclick='allButtonClicked()' id='allButtonPromtion' checked='checked'/></th>";
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
								studentFullData+="   <td><input type='checkbox' value='Delete' onclick=\"markStudentPromotion("+results[int].studentId+")\" checked='checked' /></td>";	
								studentFullData+=" </tr>";
								studentIdMap[results[int].studentId]=results[int].studentId;
							}

							studentFullData+="     </tbody>";
							studentFullData+=" </table>";
							$("#studentFullDataPromotion").append(studentFullData);
	
}

var studentIdMap={};
function markStudentPromotion(studentId){
	if(studentId in studentIdMap){
		delete studentIdMap[studentId];
	}else{
		studentIdMap[studentId]=studentId;
	}
	
}

function promoteStudents(swap){
	var input={};
	var containsStudents=false;
	for (var m in studentIdMap){
		containsStudents=true;
	}
	if(!containsStudents){
		alertify.error("Please select students for Promoting");
		return;
	}
	
	if(fromSchoolClassSectionId==0){
		alertify.error("Please choose from class for promotion");
		return;
	}
	if(toSchoolClassSectionId==0){
		if(passedOut==0){
			alertify.error("Please choose To class for promotion");
			return;
		}else{
			var studentIdArray=[];
			var loop=0;
			for (var m in studentIdMap){
				var temp={"studentId":m};
				studentIdArray.push(temp);
			}
			var input={"passOut":1,"fromSchoolClassSectionId":fromSchoolClassSectionId,"toSchoolClassSectionId":toSchoolClassSectionId,
					"studentIdArray":studentIdArray,"swap":0}
			 $.ajax({
			        dataType: "json",
			        type : 'POST',
			        url: 'admin/student/promoteStudents;jsessionid='+JSESSIONID,
			        data: {"input":JSON.stringify(input)} ,
			        success: function(data) {
			        	if(data.error=="false"){
			        		findAllStudentDetailsPromotion(fromSchoolClassSectionId);
			        		alertify.success(data.message);
			        		passedOut=0;
			        		return;
			        	}else{
			        		if(data.error=="true"){
			        			alertify.error(data.message);
			        		}
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
			return;
		}
		
	}
	
	var studentIdArray=[];
	var loop=0;
	for (var m in studentIdMap){
		var temp={"studentId":m};
		studentIdArray.push(temp);
	}
	var swapLocal=0;
	if(swap!=undefined){
		swapLocal=1;
	}
	var input={"passOut":0,"fromSchoolClassSectionId":fromSchoolClassSectionId,"toSchoolClassSectionId":toSchoolClassSectionId,
			"studentIdArray":studentIdArray,"swap":swapLocal}
	 $.ajax({
	        dataType: "json",
	        type : 'POST',
	        url: 'admin/student/promoteStudents;jsessionid='+JSESSIONID,
	        data: {"input":JSON.stringify(input)} ,
	        success: function(data) {
	        	if(data.error=="false"){
	        		findAllStudentDetailsPromotion(toSchoolClassSectionId);
	        		alertify.success(data.message);
	        	}else{
	        		if(data.error="true"){
	        			alertify.error(data.message);
	        			return;
	        		}
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

function passedOut123(){
	//$("#toClassPromotion").toggle();
	passedOut=1;
	promoteStudents();
}

var allButton=1;


function allButtonClicked(){
	if(allButton==0){
		allButton=1;
		//Check all checkbox
	}else{
		allButton=0;
		//UnCheck all checkbox
	}
	
}
