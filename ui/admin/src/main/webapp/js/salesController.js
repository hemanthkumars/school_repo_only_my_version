angular.module('app')
.controller ('salesController', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout) {
	$timeout(enableAutoComplete(), 0);
	
	$scope.toggleInput=function(input){
		if(input==1){
			globalInput="codeInput";
			$("#productCode").show();
			$("#codeInput").focus();
			$("#nameInput").hide();
			$(".k-widget").hide();
		}else{
			globalInput="nameInput";
			$("#nameInput").show();
			$("#nameInput").focus();
			$("#productCode").hide();
			$(".k-widget").show();
			//enableAutoComplete();
		}
	};
	$scope.toggleInput(1);
	
	function enableAutoComplete(){/*
		$("#nameInput").kendoAutoComplete({
		     dataTextField: "productName",
		     dataValueField: "productId",
		    // filter: "contains",
		     minLength: 2,
		     dataSource: {
		         type: "json",
		         //serverFiltering: true,
		         transport: {
		             read: '/seller/product/fetchProductByName',
		             parameterMap: function () {
		          	   ent=$('#nameInput').val();
		                 return { param:ent };
		             }
		         }
		     },
		     
		     select: onSelect,
		     change: function (e){
		    	 
		     },
		    
		     animation: {
		    	   close: {
		    	     effects: "zoom:out",
		    	     duration: 300
		    	   }
		    	  }
		     
		 });
		   $("#nameInput").addClass("form-control");
		   $("#nameInput").hide();
	*/
		var nameInputData=[];
		$( "#nameInput" ).autocomplete({
            minLength: 0,
            autofocus : true,
            minlength : 2,
            source:  function( request, response ) {
                $.ajax({
                    dataType: "json",
                    type : 'POST',
                    url: urlappend+'product/fetchProductByName',
                    data: {"param":$( "#nameInput" ).val()},
                    success: function(data) {
                    	nameInputData=data;
                    	 response(data);
                    },
                    error: function(data) {
                      //  $('input.suggest-user').removeClass('ui-autocomplete-loading');  
                    }
                });
            },
            focus: function( event, ui ) {
               $( "#nameInput" ).val( ui.item.label );
                  return false;
               },
            select: function( event, ui ) {
               $( "#nameInput" ).val( ui.item.label );
               $( "#productCode" ).val( ui.item.value );
               fetchProductFullDetails(ui.item.value);
               
               return false;
            }
         })	
         
	
	}
	
	function fetchProductFullDetails(){
		$scope.productCode=$("#productCode").val();
		if($scope.productCode==undefined||$scope.productCode==""){
			alertify.error("Please Enter the Code");
			return;
		}
		
		var serverPath="product/findProductDetailsByCode"
		$http({
            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
            method: "POST",
            params:{"productCode":$scope.productCode} 

        }).success(function (data, status, headers, config) {
        	$rootScope.validateSession(data);
        	if(data.error=="true"){
				alertify.error(data.message);
				return;
			}
        	if(data.exists=="true"){
        		$scope.productData=JSON.parse(data.product);	
        		var productPriceDivData="";
        		var productPriceArray=[];
        		productPriceArray=$scope.productData.productPrices;
        		productPriceArrayGlobal=productPriceArray;
        		productDataGlobal=$scope.productData;
        		$('#nameInput').val($scope.productData.productName);
        	    var productPrice={};
        		if(productPriceArray.length>1){
        			openModalForSelectingProduct(productPriceArray, $scope.productData);
        		}else{
        			populateProductPriceMap(productPriceArray[0],$scope.productData);
        		}
        	}else{
        		alertify.error(data.message);
				return;
        	}
        	
        	$scope.showFullProductDetails=true;
        }).error(function (data, status, headers, config) {
        	$('#loginButton').removeAttr('disabled');
        });

	};
	function onSelect(e) {
		 var dataItem = this.dataItem(e.item.index());
		 $("#productCode").val(dataItem.productId);
		 fetchProductFullDetails(dataItem.productId);
		 var data=[];
		 $("#nameInput").kendoAutoComplete({dataSource:data});
		 
	}
	
	$scope.payInvoice=function(){
		var settlementArray=[];
		var paymentTypeId=$("#paymentTypeId1").val();
		var totalAmtTendered=0;
		for (var int = 1; int <= settlementCountGlobal; int++) {
			var paymentTypeId=$('#paymentTypeId'+int+'').val();
			var amountPaid=$('#tenderedAmt'+int+'').val();
			totalAmtTendered+=amountPaid;
			if(amountPaid==""||amountPaid==undefined){
				alertify.error("Please Enter the Amount!");
				return;
			}
			var item={"paymentTypeId":paymentTypeId,"amountPaid":amountPaid};
			settlementArray.push(item);
			console.log(int);
		}
		if(totalAmtTendered<grandTotalGlobal){
			alertify.error("Full Amount not received!");
			return ;
		}
		
		var serverPath="invoice/saveInvoice";
		var input={"billDetails":productPriceMap,"paymentDetails":settlementArray};
		$http({
            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
            method: "POST",
            params:{"input":JSON.stringify(input)} 

        }).success(function (data, status, headers, config) {
        	$rootScope.validateSession(data);
        	if(data.error=="true"){
				alertify.error(data.message);
				return;
			}else {
				alertify.success(data.message);
				var invoiceId=data.invoiceId;
				serverPath="invoice/printInvoice"
				$http({
		            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
		            method: "POST",
		            params:{"invoiceId":invoiceId} 

		        }).success(function (data, status, headers, config) {
		        	$rootScope.validateSession(data);
		        	if(data.error=="true"){
						alertify.error(data.message);
						return;
					}else {
						alertify.success(data.message);
					}
		        }).error(function (data, status, headers, config) {
		        	
		        });
				
			}
        }).error(function (data, status, headers, config) {
        	
        });
	};
	
	$scope.fetchBuyer=function(){
       var mobileNo=$("#mobileNo").val();
       var email=$("#buyerEmail").val();
       var name=$("#buyerName").val();
		
		var serverPath="login/fetchBuyer";
		var input={"mobileNo":mobileNo};
		$http({
            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
            method: "POST",
            params:{"input":JSON.stringify(input)} 

        }).success(function (data, status, headers, config) {
        	$rootScope.validateSession(data);
        	if(data.error=="true"){
				alertify.error(data.message);
				return;
			}else {
				if(data.newUser=="true"){
					alertify.success("Person is new Buyer.Please Fill all the  details");
					$("#buyerName").show();
					$("#buyerEmail").show();
					$("#saveBuyerButton").show();
				}else{
					data.userMaster=JSON.parse(data.userMaster);
					$("#mobileNo").val(data.userMaster.mobile);
					$("#mobileNo").attr("disabled", "disabled"); 	
					$("#buyerEmail").val(data.userMaster.email);
					$("#buyerName").val(data.userMaster.name);
					$("#mobileNo").show();
					$("#buyerEmail").show();
					$("#buyerName").show();
					buyerUsermasterIdGlobal=data.userMaster.userMasterId;
					$("#saveBuyerButton").show();
					alertify.success("Person is already registered.Please Tag to continue");
				}
			}
        	
        }).error(function (data, status, headers, config) {
        	
        });
	
	}
	
	$scope.saveBuyer=function(){

	       var mobileNo=$("#mobileNo").val();
	       var email=$("#buyerEmail").val();
	       var name=$("#buyerName").val();
			
			var serverPath="login/saveBuyer";
			var input={"mobileNo":mobileNo,"name":name,"email":email};
			$http({
	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{"input":JSON.stringify(input)} 

	        }).success(function (data, status, headers, config) {
	        	$rootScope.validateSession(data);
	        	if(data.error=="true"){
	        		$("#buyerDetails").empty("");
					$("#buyerDetails").append(data.userMaster.name);
					alertify.error(data.message);
					return;
				}else {
					$("#buyerDetails").empty("");
					$("#buyerDetails").append(data.userMaster.name);
					alertify.success(data.message);
					
				}
	        	
	        }).error(function (data, status, headers, config) {
	        	
	        });
		
		
	}
	
});

var productPriceMap={};
var productPriceArrayGlobal;
var productDataGlobal;
var globalInput;

function populateProductPriceMap(productPrice,productData){
	var quatityLocal=parseInt($('#quantity').val());
	quatityLocal=parseFloat(quatityLocal);
	var productPriceId=productPrice.productPriceId;
	if(productPriceId in productPriceMap){
		var productPriceMapValue=productPriceMap[productPriceId];
		var temp=productPriceMapValue["quantity"];
		temp=parseFloat(temp);
		temp=temp+quatityLocal;
		productPriceMapValue["quantity"]=temp;
		productPriceMap[productPriceId]=productPriceMapValue;
	}else{
		var productPriceMapValue={};
		productPriceMapValue["priceDetails"]=productPrice;
		productPriceMapValue["productDetails"]=productData;
		productPriceMapValue["quantity"]=quatityLocal;
			
		productPriceMap[productPriceId]=productPriceMapValue;
	}
	if(globalInput=="codeInput"){
		$("codeInput").val("");
		$("codeInput").focus();
	}else{
		$("nameInput").focus();
		$("nameInput").val("");
	}
console.log(productPriceMap);		
displayScannedProduct();
}

var globalSelectedProductPrice={};
var grandTotalGlobal=0;

function openModalForSelectingProduct(productPriceArray,productData){
	$("#productPriceModal").modal();
	$('#productPriceDiv').empty();
	var productPriceDivData="";
	for (var int = 0; int < productPriceArray.length; int++) {
		productPriceDivData+='<div style="width: 200px;border: 5px solid blue; margin: 25px;cursor: pointer;' ;
		productPriceDivData+='height: 100px;margin-top: 5px;display: inline-block;"  onclick="afterSelectingProductPriceInModal('+int+')">';
		productPriceDivData+='MRP:'+productPriceArray[int].mrp+' Rs<br/>';
		var tempDate=new Date(productPriceArray[int].expiryDate);
		var formattedDate=$.datepicker.formatDate("dd/M/yy", tempDate);
		productPriceDivData+='ExpiryDate :'+formattedDate+'<br/>';
		productPriceDivData+='Net Price:'+productPriceArray[int].sellingPriceAfterTax+' Rs<br/>';
		productPriceDivData+='Available Quantity: '+productPriceArray[int].quantity+' Unit<br/>';
		productPriceDivData+='</div>';
	}
	$('#productPriceDiv').append(productPriceDivData);

	
}

function afterSelectingProductPriceInModal(arrayIndexSelected){
	$('#productPriceModal').modal('hide');
	populateProductPriceMap(productPriceArrayGlobal[arrayIndexSelected], productDataGlobal);
	
};

function displayScannedProduct(){
	var displayContent='';
	$("#productSannedContent").empty();
	displayContent+='<table style="width: auto;" class="table">';
	displayContent+='    <tr>';
	displayContent+='    <td  style="width: 50px;">SL NO</td>';
	displayContent+='    <td  style="width: 100px;">Code</td>';
	displayContent+='    <td  style="width: 200px;">Name</td>';
	displayContent+='    <td  style="width: 100px;">Exp Dt</td>';
	displayContent+='    <td  style="width: 25px;">VAT%</td>';
	displayContent+='    <td  style="width: 25px;">MRP</td>';
	displayContent+='    <td  style="width: 25px;">Selling Price</td>';
	displayContent+='    <td  style="width: 25px;">Quantity</td>';
	displayContent+='    <td style="width: 100px;">SubTotal</td>';
	displayContent+='    <td  style="width: 50px;">Delete</td>';
	displayContent+='    </tr>';
	var mapSize=Object.keys(productPriceMap).length;
	var grandTotal=0;
	var int=0;
	for (var m in productPriceMap){
		int+=1;
		var element = productPriceMap[m];
		var productPrice=element.priceDetails;
		var product=element.productDetails;
		var quantity=element.quantity;
		var taxPercentage=0;
		var subTotal=productPrice.sellingPriceAfterTax*quantity;
		grandTotal+=subTotal;
		if(productPrice.productPriceTaxes.length!=0){
			productPriceTax=productPrice.productPriceTaxes[0];
			taxPercentage=productPriceTax.taxPercentage;
		}
		var slNo=int;
		
		displayContent+='    <tr>';
		displayContent+='    <td>'+slNo+'</td>';
		displayContent+='    <td>'+product.productCode+'</td>';
		displayContent+='    <td>'+product.productName+'</td>';
		var tempDate=new Date(productPrice.expiryDate);
		var formattedDate=$.datepicker.formatDate("dd/M/yy", tempDate);
		displayContent+='    <td>'+formattedDate+'</td>';
		displayContent+='    <td>'+taxPercentage+'</td>';
		displayContent+='    <td>'+productPrice.mrp+'</td>';
		displayContent+='    <td><input type="text" id="sellingPriceOf'+productPrice.productPriceId+'" value='+productPrice.sellingPriceAfterTax+' onkeyup="updateChangesInMap('+productPrice.productPriceId+')" /></td>';
		displayContent+='    <td><input type="text" id="quantityOf'+productPrice.productPriceId+'" value='+quantity+' onkeyup="updateChangesInMap('+productPrice.productPriceId+')" /></td>';
		displayContent+='    <td><input type="text" id="subTotalOf'+productPrice.productPriceId+'"  disabled value='+subTotal+' onkeyup="updateChangesInMap('+productPrice.productPriceId+')" /></td>';
		/*displayContent+='    <td  style="width: 50px;"><a onclick="updateProductPriceMap('+productPriceId+')">Update</td>';*/
		displayContent+='    <td  style="width: 50px;"><a onclick="deleteProductPriceMap('+productPrice.productPriceId+')">Delete</td>';
		displayContent+='    </tr>';
	}
	displayContent+='</table>';
	$("#productSannedContent").append(displayContent);
	$("#grandTotal").empty();
	$("#grandTotal").append(grandTotal);
	grandTotalGlobal=grandTotal;
	
	 
}


function updateChangesInMap(productPriceId){
	var sellingPriceOf=$('#sellingPriceOf'+productPriceId).val();
	var quantityOf=$('#quantityOf'+productPriceId).val();
	if(sellingPriceOf==""){
		sellingPriceOf=0;
	}
	if(quantityOf==""){
		quantityOf=0;
	}
		var subTotalOf=sellingPriceOf*quantityOf;
	    var temp=	productPriceMap[productPriceId];
	    var priceDetails=temp["priceDetails"];
	    var quantityOld= temp["quantity"];
	    var priceOld= priceDetails.sellingPriceAfterTax;
	    var subTotalOld=quantityOld*priceOld;
	    grandTotalGlobal=grandTotalGlobal-subTotalOld;
	    grandTotalGlobal=grandTotalGlobal+subTotalOf;
		
	    priceDetails.sellingPriceAfterTax=sellingPriceOf;
	    temp["quantity"]=quantityOf;
	    	
		$('#subTotalOf'+productPriceId).val(subTotalOf);
		$("#grandTotal").empty();
		$("#grandTotal").append(grandTotalGlobal);
	
}



function deleteProductPriceMap(productPriceId){
	delete productPriceMap[productPriceId];
	displayScannedProduct();
}

function clearInput(idToBeCleared){
	$('#'+idToBeCleared).val('');
}

function PrintDiv() {
    var contents = document.getElementById("dvContents").innerHTML;
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

var settlementCountGlobal=0;

function addOrRemovePayment(op){
	console.log(settlementCountGlobal);
	var settlementData="";
	if(op==1){
		settlementCountGlobal+=1;
		var	settlementCount=settlementCountGlobal;
	settlementData+=' <span id="settlementDiv'+settlementCount+'">';
	settlementData+='  <select class="form-control" style="display: inline-block;height: 50px;width: 150px;" id="paymentTypeId'+settlementCount+'">';
	settlementData+='       <option value="10">CASH</option>';
	settlementData+='       <option value="20">CARD</option>';
	settlementData+='       <option value="30">CREDIT(PAY LATER)</option>';
	settlementData+='  </select>';
	
	settlementData+='  <div id="cashPay'+settlementCount+'" style="display: inline-block">';
	settlementData+='  <input type="text" id="tenderedAmt'+settlementCount+'"  class="form-control" placeholder="Tendered Amount" style="display: inline-block;height: 50px;width: 150px;"/>';
	//settlementData+='   <input type="text" id="finalAmt'+settlementCount+'"  class="form-control" placeholder="Bill Total" style="display: inline-block;height: 50px;width: 150px;" disabled="disabled"/>';
	//settlementData+='  <input type="text" id="change'+settlementCount+'"  class="form-control" placeholder="Change" disabled="disabled" style="display: inline-block;height: 50px;width: 150px;"/>';
	settlementData+='   </div>';
	settlementData+='   <div id="cardPay'+settlementCount+'" style="display: none;">';
	settlementData+='    <input type="text" id="4digitCardNo'+settlementCount+'"  class="form-control" placeholder="Last 4 Digit Card No"/>';
	settlementData+='   </div>';
	settlementData+='  <br/>';
	settlementData+='  </span>';
	$('#settlementData').append(settlementData);
	}else{
		if(settlementCountGlobal!=1){
			$('#settlementDiv'+settlementCountGlobal).remove();
			settlementCountGlobal-=1;
		}
		
	}
	
}

function openCheckOutModal(){
	$("#settlementModal").modal('show');
			$("#totalInvAmt").val(grandTotalGlobal);
			$("#settlementData").empty();
			settlementCountGlobal=0;
			addOrRemovePayment(1);
		}
		
function openBuyerTagModal(){
$("#buyerTag").modal('show');
$("#buyerName").hide();
$("#buyerEmail").hide();
$("#saveBuyerButton").hide();
$("#mobileNo").val('');
$("#buyerName").val('');
$("#buyerEmail").val('');
$("#mobileNo").removeAttr("disabled"); 				
					
};		
		
var buyerUsermasterIdGlobal=0;		
var buyerNameGlobal="";
var buyerMobileGlobal="";




