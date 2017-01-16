angular.module('app')
.controller ('birthdayCtrl', function($scope,$rootScope,$stateParams,$http,$filter,$state) {

 });

function findBirthDayList(){
	if($("#month").val()==""||$("#month").val()==undefined){
		alertify.error("Please Select Month");
		return;
	}
    var input={"monthId":$("#month").val()};
    $.ajax({
        dataType: "json",
        type : 'POST',
        url: 'admin/student/findBirthdayLIst;jsessionid='+JSESSIONID,
        data: {"input":JSON.stringify(input)} ,
        success: function(data) {
        	if(data.error=="false"){
        		var results=JSON.parse(data.result);
        		populateBirthDayList(results);
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


function populateBirthDayList(results){
	var studentFullData=""
		$("#studentBirthDayList").empty();
	if(results.length==0){
		$("#studentBirthDayList").append("No Birthday's on this Month");
		alertify.success("No BirthDay on this month")
		return;
	}
		studentFullData="";
							studentFullData+=" <table class='table' >";
							studentFullData+="     <thead>";
							studentFullData+="       <tr>";
							studentFullData+="         <th>Sl No</th>";
							studentFullData+="         <th>Class</th>";
							studentFullData+="         <th>Name</th>";
							studentFullData+="          <th>Date Of Birth</th>";
							studentFullData+="          <th>Gender</th>";
							studentFullData+="       </tr>";
							studentFullData+="     </thead>";
							studentFullData+="     <tbody>";

							for (var int = 0; int < results.length; int++) {
								var slno=int;
								slno+=1;
								studentFullData+="<tr>";
								studentFullData+="   <td>"+slno+"</td>";
								studentFullData+="   <td>"+results[int][4]+"</td>";
								studentFullData+="   <td>"+results[int][1]+"</td>";
								var ms=results[int][2];
								var dateofbirth=new Date(ms);
								studentFullData+="   <td>"+dateofbirth.toDateString()+"</td>";
								studentFullData+="   <td>"+results[int][6]+"</td>";
								studentFullData+=" </tr>";
							}

							studentFullData+="     </tbody>";
							studentFullData+=" </table>";
							$("#studentBirthDayList").append(studentFullData);
	
}

function printDiv(divName) {
    var contents = document.getElementById(divName).innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head><title>DIV Contents</title>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
}