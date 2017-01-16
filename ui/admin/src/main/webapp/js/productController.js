angular.module('app')
.controller ('productController', function($scope,$rootScope,$stateParams,$http,$filter,$state,$timeout) {
	$timeout(makeAuto(), 0);
	$( "#taxId" ).val(10);
	$( "#taxPercentage" ).val(1);
	$scope.showFullProductDetails=true;
	$scope.myDate = new Date();
	$scope.findAllStaticDataForProductMaster=function(){
		var serverPath="/product/findAllStaticDataForProductMaster"
		$http({
	            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
	            method: "POST",
	            params:{} 

	        }).success(function (data, status, headers, config) {
	        	$rootScope.validateSession(data);
	        	$scope.units=JSON.parse(data.units);
	        	$scope.brands=JSON.parse(data.brands);
	        	$scope.productPrefixs=JSON.parse(data.productPrefixs);
	        	$scope.productCategories=JSON.parse(data.productCategories);
	        }).error(function (data, status, headers, config) {
	        	$('#loginButton').removeAttr('disabled');
	        });
		 
	}
	$scope.findAllStaticDataForProductMaster();
	$('#productCode').focus();
	$scope.fetchProductFullDetails=function(){
		if($scope.productCode==undefined||$scope.productCode==""){
			return;
		}
		
		var serverPath="/product/findProductDetailsByCode"
		$http({
            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
            method: "POST",
            params:{"productCode":$scope.productCode} 

        }).success(function (data, status, headers, config) {
        	$rootScope.validateSession(data);
        	if(data.error=="true"){
				alertiy.error(data.message);
				return;
			}
        	if(data.exists=="true"){
        		$scope.productData=JSON.parse(data.product);	
        		var productPriceDivData="";
        		var productPriceArray=[];
        		productPriceArray=$scope.productData.productPrices;
        		$('#productName').val($scope.productData.productName); ;	
        		$scope.productShortName=$scope.productData.productShortName;
        		$scope.unit=$scope.productData.unitId;
        		$scope.brand=$scope.productData.brandId;
        		$scope.productCategory=$scope.productData.productCategoryId;
        		$scope.productPrefix=$scope.productData.productPrefixId;
        		var rrr=$scope.productData.rackId;
        		$('#rackId').val($scope.productData.rackId); 
        		
        		$('#productPriceDiv').empty();
        		for (var int = 0; int < productPriceArray.length; int++) {
        			productPriceDivData+='<div style="width: 200px;border: 5px solid blue; margin: 25px;';
            		productPriceDivData+='height: 100px;margin-top: 5px;display: inline-block;" onclick="editProductPrice()">';
            		productPriceDivData+='MRP:'+productPriceArray[int].mrp+' Rs<br/>';
            		productPriceDivData+='Net Price:'+productPriceArray[int].sellingPriceAfterTax+' Rs<br/>';
            		var tempDate=new Date(productPriceArray[int].expiryDate);
            		var formattedDate=$.datepicker.formatDate("dd/M/yy", tempDate);

            		productPriceDivData+='ExpiryDate :'+formattedDate+'<br/>';
            		productPriceDivData+='Available Quantity: '+productPriceArray[int].quantity+' Unit<br/>';
            		productPriceDivData+='</div>';
				}
        		$('#productPriceDiv').append(productPriceDivData);
        		
        	}
        	
        	$scope.showFullProductDetails=true;
        }).error(function (data, status, headers, config) {
        	$('#loginButton').removeAttr('disabled');
        });

	};
	$scope.showProductPriceDetails=function(i){
		for (var int = 0; int < 20; int++) {
			$('#tab'+int).removeClass("active");
		}
		$('#tab'+i).addClass("active");
		
	};
	
	$scope.calculatePricing=function (param){
		if($scope.quantity==""||$scope.quantity==undefined){
			$scope.quantity=0;
		}
		if($scope.costPricePerUnit==""||$scope.costPricePerUnit==undefined){
			$scope.costPricePerUnit=0;
		}
		if($scope.totalCostPrice==""||$scope.totalCostPrice==undefined){
			$scope.totalCostPrice=0;
		}
		if(param=="quantity"){
			$scope.totalCostPrice=	$scope.costPricePerUnit *$scope.quantity;
           if($scope.quantity!=0){
        		$scope.costPricePerUnit= $scope.totalCostPrice/$scope.quantity;
			}
		}
		
		if(param=="costPricePerUnit"){
			$scope.totalCostPrice=	$scope.costPricePerUnit *$scope.quantity;
		}
		
		
		
		if(param=="totalCostPrice"){
			if($scope.quantity!=0){
				$scope.costPricePerUnit= $scope.totalCostPrice/$scope.quantity;
			}
			
		}
		
		
	};
	$scope.expiryDate="";
	$scope.saveProduct=function(){
		alert("ssdfsdfd");
		var serverPath="product/saveProductEntry"
		var input={"productName":$("#productName").val(),
				   "productShortName":$scope.productShortName,
				   "unitId":$scope.unit.unitId,
				   "brandId":$scope.brand.brandId,
				   "productCategoryId":$scope.productCategory.productCategoryId,
				   "productPrefixId":$scope.productPrefix.productPrefixId,
				   "rackId":$scope.rackId,
				   "taxTypeId":$scope.taxType,
				   "taxPercentage":$scope.taxPercentage,
				   "costPricePerUnit":$scope.costPricePerUnit,
				   "quantity":$scope.quantity,
				   "mrp":$scope.mrp,
				   "sellingPrice":$scope.sellingPrice,
				   "expiryDate":$("#expiryDate").val(),
                   "productCode":$scope.productCode
				  };
		$http({
            url: $rootScope.urlappend + serverPath+';jsessionid='+$rootScope.JSESSIONID,
            method: "POST",
            params:{"input":JSON.stringify(input)} 

        }).success(function (data, status, headers, config) {
        	$rootScope.validateSession(data);
        	if(data.error=="true"){
				alertiy.error(data.message);
				$scope.fetchProductFullDetails();
				return;
			}
        	if(data.error=="false"){
        		alertify.success("Success");
        		
        	}
        	
        	//$scope.showFullProductDetails=false;
        }).error(function (data, status, headers, config) {
        	$('#loginButton').removeAttr('disabled');
        });
		
		
		
	};
	
	$scope.calculateSellingPrice=function(){
		$scope.marginAmt=($scope.costPricePerUnit*$scope.margin)/100;
		$scope.sellingPrice=$scope.costPricePerUnit+$scope.marginAmt;
		
	};
	
	$scope.calculateMargin=function(){
		$scope.marginAmt=$scope.sellingPrice-$scope.costPricePerUnit;
		$scope.margin=($scope.marginAmt/$scope.costPricePerUnit)*100;
		
	};
	
	function fetchProductFullDetailsLocal(code){
		$scope.productCode=code;
		$("#productCode").val(code);
		$scope.fetchProductFullDetails();
	}
	
	function makeAuto(){
		/*$("#productName").kendoAutoComplete({
		     dataTextField: "productName",
		     dataValueField: "productId",
		     filter: "contains",
		     minLength: 3,
		     data:{},
		     dataSource: {
		         type: "json",
		         serverFiltering: true,
		         transport: {
		             read: '/seller/product/fetchProductByName',
		             parameterMap: function () {
		          	   ent=$('#productName').val();
		                 return { param:ent };
		             }
		         }
		     },
		     
		     select: function (e) {
		    	 var dataItem = this.dataItem(e.item.index());
		    	 alert(dataItem.productId);
		    	 $("#productCode").val(dataItem.productId);
		    	 fetchProductFullDetailsLocal(dataItem.productId);
		    	 
		     },
		     change: function (e){
		    	 
		     }
		 });*/
		$( "#productName" ).autocomplete({
            minLength: 0,
            autofocus : true,
            minlength : 2,
            source:  function( request, response ) {
                $.ajax({
                    dataType: "json",
                    type : 'POST',
                    url: urlappend+'product/fetchProductByName',
                    data: {"param":$( "#productName" ).val()},
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
               fetchProductFullDetailsLocal(ui.item.value);
               
               return false;
            }
         })	
		
		   $("#productName").addClass("form-control");
		   
			$( "#expiryDate" ).datepicker({ dateFormat: 'dd/mm/yy' });
	}
	
	
});

function onSelect(e) {
    if ("kendoConsole" in window) {
        var dataItem = this.dataItem(e.item.index());
        kendoConsole.log("event :: select (" + dataItem + ")" );
        alert(dataItem);
    }
}


