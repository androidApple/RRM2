var db=null;
angular.module('starter.controllers', [])



.controller('SignInCtrl', function($base64,$ionicPlatform,$scope, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite,$cordovaDevice) {

$ionicPlatform.ready(function() {
   
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {

  //Change this to false to return accessory bar 
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
   
    
    if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device. Please Connect Internet"
                    })
                    
                }
            }
           
     //Begin For sqlite**********************************
    db = window.sqlitePlugin.openDatabase({name: "rrnmb"});

      db.transaction(function(tx) {
       //tx.executeSql('DROP TABLE IF EXISTS user_info');
       // tx.executeSql('DROP TABLE IF EXISTS branch_location');
        tx.executeSql('CREATE TABLE IF NOT EXISTS user_info (user_id text)');
     
        
//For user
db.transaction(function(tx) {
            tx.executeSql("SELECT user_id from user_info;", [], function(tx, res) {
              // alert("res.rows.length: " + res.rows.length + " -- should be 1");
                //alert("res.rows.item(0).user_id: " + res.rows.item(0).user_id + " -- should be 100");
                var user_id11=res.rows.item(0).user_id;
                  $scope.user = { uname:user_id11};
            });
        });
        
        //Begin Show Branch Info
          
   
        
        

      });
   
      
    
 
    
  });

//begin ready
	/*  $ionicPlatform.ready(function() {
   

   
    
		if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device. Please Connect Internet"
                    })
                    
                }
            }
           
     //Begin For sqlite**********************************
    db = window.sqlitePlugin.openDatabase({name: "rrndb"});

      db.transaction(function(tx) {
       //tx.executeSql('DROP TABLE IF EXISTS user_info');
       // tx.executeSql('DROP TABLE IF EXISTS branch_location');
        tx.executeSql('CREATE TABLE IF NOT EXISTS user_info (user_id text)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_location (slno text,office_type text,office_address text,phone text,fax text,hotline text,email text,lat text,lng text)');
				
//For user
db.transaction(function(tx) {
            tx.executeSql("SELECT user_id from user_info;", [], function(tx, res) {
              // alert("res.rows.length: " + res.rows.length + " -- should be 1");
                //alert("res.rows.item(0).user_id: " + res.rows.item(0).user_id + " -- should be 100");
                var user_id11=res.rows.item(0).user_id;
                	$scope.user = { uname:user_id11};
            });
        });
        
        //Begin Show Branch Info
          
			$rootScope.officeLocation = [];
	  db.transaction(function(tx) {
            tx.executeSql("SELECT * from tb_location;", [], function(tx, res) {
             
                 var len = res.rows.length;
                 if(len>0){
                 	 for (var i = 0; i < len; i++) {
                 	 //	alert("res.rows.item(0).branch_code: " + res.rows.item(i).branch_code + "Branch Name :"+res.rows.item(i).branch_name);
                 	 //listItems.push(res.rows.item(i).branch_code);
                 	  $scope.officeLocation.push({
                 	  	slno: res.rows.item(i).slno, 
                 	  	office_type: res.rows.item(i).office_type,
                 	  	office_address: res.rows.item(i).office_address,
                 	  	phone: res.rows.item(i).phone,
                 	  	 fax: res.rows.item(i).fax,
                 		 hotline: res.rows.item(i).hotline,
                 	  	email: res.rows.item(i).email,
                 		 lat: res.rows.item(i).lat,
						  lng: res.rows.item(i).lng
                 		
                 	  });
                 	  // Make sure to apply scope change so that ng-repeat updates
        		$scope.$apply();
                 	//$scope.categories.push({slno: res.rows.item(i).slno, branch_name: res.rows.item(i).branch_name});
                 	 }
                 	 	
                 	 }
                 })
            });
        
        //End show branch Info
        
        

      });
    //End sqlite**********************************************************
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
			$ionicPlatform.registerBackButtonAction(function (event) {
			event.preventDefault();
			}, 100) 
			
		
 
		
  });
  
  //End ready
  */
//Being 
$rootScope.randomNumbergen='';
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < 8; i++ ){
	$rootScope.randomNumbergen +=possible.charAt(Math.floor(Math.random() * possible.length));
	}
//end
$rootScope.getServerIp='http://27.147.153.142:8084/'  //For Own Pc
//$scope.user = { uname:'ADMIN'};  

	$scope.login= function (user) {
		if(!user || ! user.uname){
			 $ionicPopup.alert({
			  title: 'User ID Required !',
			  //template:'From date'
			  })
			//alert("Please Enter Your User ID");
			}else if(!user || ! user.pass){
				 $ionicPopup.alert({
			  title: 'Password Required !',
			  //template:'From date'
			  })
			}else{
		$ionicLoading.show({
                template: 'Please Wait..'
            });
				
		
		$http({
							  method: 'POST',
							
							  url:  $rootScope.getServerIp+'AimsAppsConnectivity/LoginErrorCode',
							  params: {uname:$base64.encode(user.uname),pass:$base64.encode(user.pass),imei:$base64.encode($cordovaDevice.getUUID())},
							   //params: {uname:user.uname,pass:user.pass},
							  
							  //type:'JSON',
							  headers : { 'Content-Type': 'application/json' }
							   }).success(function(data, status, headers, config) {
								//alert("success");
								//alert(data.loginNodes[0].userType);
									user.pass='';
									   if(data.loginNodes[0].errorCode == 0 && data.loginNodes[0].userType=="A") {
									   $rootScope.sessionID=data.loginNodes[0].sessionID;
									    $rootScope.loginMessage=data.loginNodes[0].errorMessage;
										 $rootScope.userType=data.loginNodes[0].userType;
										  $rootScope.userID= user.uname;

									  // $ionicLoading.hide();
									  
									  
									   //Begin Purchase order Client Operator mode
											 
												  $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderOperarationModSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.purchaseOrderOperationMode=data;	
																			//alert('success');
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End purchase Order client Operator Mode
											 
											 //Being Bank List
											 
											   $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOrderBankOperationSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.purchaseOrderBankList=data;	
																			//alert(data.companyNameIDNodes[0].companyNameID);
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End Bank List
									   
									   
								 //Begin Individual Party List
									  $http({
										method: 'POST',									  
										url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualPartyIdNameOnloadSV',
										//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
															  //type:'JSON',
												headers : { 'Content-Type': 'application/json' }
												}).success(function(data, status, headers, config) {
													
														$rootScope.individualPartyListNameIDList=data;	
															//alert('success');
														
									}).error(function(data, status, headers, config) {
										 $ionicLoading.hide();
										 $ionicPopup.alert({
										title:'Unable to perform your request. Please Check your Device Internet Connection',
														  //template:'From date'
										 })
														
								});
														
								//End Indvidual Party List
								
										//Begin Single Customer List
										 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualCustomerIdNameOnloadSV',
									 // params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$rootScope.singleCustomerListIdName=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										
										
									}); 
										
										//End Single Customer List
										
										
										 //Begin Cash Payment Dept Wise List
											  
											   $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/CashPaymentCompanyIDNameOnLoadSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.cashPaymentDeptWiseExpenseList=data;	
																			//alert('success');
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End Cash Payment Dept wise List
									 
									//$state.go('app.welcome');
									//Second Request End
									
									
										//Begin User ID						 	
											
										db.transaction(function(tx) {       
										tx.executeSql("select user_id from user_info where user_id=? ;", [user.uname], function(tx, res) {
											 if(res.rows.length > 0) {
											// alert("Found");
										 $state.go('app.welcome');
										 
										  }else{
										  
											tx.executeSql("delete from user_info ;", [], function(tx, res) {
										//	alert("Deleted");
										  
												tx.executeSql("INSERT INTO user_info (user_id) VALUES (?)", [user.uname], function(tx, res) {
											 //alert("Insert successfully");
											  $state.go('app.welcome');
											 
											}, function(e) {
											 
											  alert("ERROR:");
											});
										
										});
										
										  }
										})       
								  });
								  
								  
								// End user ID 
													
									}else if(data.loginNodes[0].errorCode == 0 && data.loginNodes[0].userType=="E"){
												$ionicLoading.show({
							template: 'Please Wait..'
						});
												
											  $rootScope.sessionID=data.loginNodes[0].sessionID;
									    $rootScope.loginMessage=data.loginNodes[0].errorMessage;
										 $rootScope.userType=data.loginNodes[0].userType;
										  $rootScope.userID= user.uname;

											   //$ionicLoading.hide();
											   
											   
											    //Begin Purchase order Client Operator mode
											 
												  $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderOperarationModSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.purchaseOrderOperationMode=data;	
																			//alert('success');
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End purchase Order client Operator Mode
											 
											 //Being Bank List
											 
											   $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOrderBankOperationSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.purchaseOrderBankList=data;	
																			//alert(data.companyNameIDNodes[0].companyNameID);
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End Bank List
											   
											   
										 //Begin Individual Party List
											  $http({
												method: 'POST',									  
												url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualPartyIdNameOnloadSV',
												//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																	  //type:'JSON',
														headers : { 'Content-Type': 'application/json' }
														}).success(function(data, status, headers, config) {
															
																$rootScope.individualPartyListNameIDList=data;	
																	//alert('success');
																
											}).error(function(data, status, headers, config) {
												 $ionicLoading.hide();
												
																
										});
																
										//End Indvidual Party List
										
												//Begin Single Customer List
												 $http({
											  method: 'POST',
											  
											  url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualCustomerIdNameOnloadSV',
											 // params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
											  //type:'JSON',
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												//alert("success...");            
													
													$rootScope.singleCustomerListIdName=data;
													$ionicLoading.hide();
													
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												$ionicLoading.hide();
												
											}); 
												
												//End Single Customer List
											 $ionicLoading.hide();
											//$state.go('app.welcome');





											 //Begin User ID						 	
											
										db.transaction(function(tx) {       
										tx.executeSql("select user_id from user_info where user_id=? ;", [user.uname], function(tx, res) {
											 if(res.rows.length > 0) {
											// alert("Found");
										 $state.go('app.clientWelcome');
										 
										  }else{
										  
											tx.executeSql("delete from user_info ;", [], function(tx, res) {
										//	alert("Deleted");
										  
												tx.executeSql("INSERT INTO user_info (user_id) VALUES (?)", [user.uname], function(tx, res) {
											 //alert("Insert successfully");
											$state.go('app.welcome');

											 
											}, function(e) {
											 
											  alert("ERROR:");
											});
										
										});
										
										  }
										})       
								  });
								  
								  
								// End user ID 



											//Second Request End
									
									}else if(data.loginNodes[0].errorCode == 0 && data.loginNodes[0].userType=="C"){
									  $ionicLoading.hide();
									 
									
										 $rootScope.sessionID=data.loginNodes[0].sessionID;
									    $rootScope.loginMessage=data.loginNodes[0].errorMessage;
										 $rootScope.userType=data.loginNodes[0].userType;
										  $rootScope.userID= user.uname;
											 
											 
											 //Begin Purchase order Client Operator mode
											 
												  $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderOperarationModSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.purchaseOrderOperationMode=data;	
																			//alert('success');
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End purchase Order client Operator Mode
											 
											 //Being Bank List
											 
											   $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOrderBankOperationSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.purchaseOrderBankList=data;	
																			//alert(data.companyNameIDNodes[0].companyNameID);
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End Bank List
											 
											 
											  //Begin Cash Payment Dept Wise List
											  
											   $http({
														method: 'POST',									  
														url:  $rootScope.getServerIp+'AimsAppsConnectivity/CashPaymentCompanyIDNameOnLoadSV',
														//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																			  //type:'JSON',
																headers : { 'Content-Type': 'application/json' }
																}).success(function(data, status, headers, config) {
																	
																		$rootScope.cashPaymentDeptWiseExpenseList=data;	
																			//alert('success');
																		
													}).error(function(data, status, headers, config) {
														 $ionicLoading.hide();
														
																		
												});
											 //End Cash Payment Dept wise List
											
											 
											 //$state.go('app.clientWelcome');

											 //Begin User ID						 	
											
										db.transaction(function(tx) {       
										tx.executeSql("select user_id from user_info where user_id=? ;", [user.uname], function(tx, res) {
											 if(res.rows.length > 0) {
											// alert("Found");
										 $state.go('app.clientWelcome');
										 
										  }else{
										  
											tx.executeSql("delete from user_info ;", [], function(tx, res) {
										//	alert("Deleted");
										  
												tx.executeSql("INSERT INTO user_info (user_id) VALUES (?)", [user.uname], function(tx, res) {
											 //alert("Insert successfully");
											  $state.go('app.welcome');
											 
											}, function(e) {
											 
											  alert("ERROR:");
											});
										
										});
										
										  }
										})       
								  });
								  
								  
								// End user ID 

										 
									
									}else{
										$ionicLoading.hide();									
										
										$ionicPopup.alert({
										  title:data.loginNodes[0].errorMessage,
										  //template:'From date'
										  })
										
									}
								
								}).error(function(data, status, headers, config) {
								$ionicLoading.hide();
								$ionicPopup.alert({
								 title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
								})
							}); 
								
		}
		
		 $timeout(function() {
    $ionicLoading.hide();
   }, 10000);
}

})

.controller('TabsCtrl', function($scope,$ionicActionSheet,$timeout) {
$scope.services = function() {
    var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Our Services',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
    /* buttonClicked: function(index) {
       return true;
     }*/
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 10000);

  }
})



.controller('LocationsCtrl', function($scope,$state,Chats, $http, $rootScope, $ionicPopup, $ionicLoading, $timeout) {

//Begin siync
  $scope.btnSyncLocation=function(){
  		if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device. Please Connect Internet"
                    })
                    
                }else{
						 $ionicLoading.show({
						template: 'Please Wait..'
					});
		  
				$http({
				  method: 'POST',
				  
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/LocationSV',
				 // params: {cusCode:cusCode},
				  //type:'JSON',
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					
				//Begin delete
				
				db.transaction(function(tx) {
					tx.executeSql("DELETE from tb_location;", [], function(tx, res) {
						
						 })
					});
				//End Delete
						  //Being Sink
				angular.forEach(data.contactInfoNodes, function(contactInfoNodes, index) {
									
						var islno=contactInfoNodes.slNo;
						var ioffice_type=contactInfoNodes.officeType;
						var ioffice_address=contactInfoNodes.officeAddres;
						var iphone=contactInfoNodes.phone;
						var ifax=contactInfoNodes.fax;
						var ihotline=contactInfoNodes.hotline;
						var iemail=contactInfoNodes.email;
						var ilat=contactInfoNodes.lat;
						var ilng=contactInfoNodes.lng;
									
							db.transaction(function(tx) {
						//// tx.executeSql('CREATE TABLE IF NOT EXISTS tb_location 
						//(slno text,office_type text,office_address text,phone text,fax text,hotline text,email text,lat text,lng text)');
						
					 tx.executeSql("INSERT INTO tb_location (slno,office_type,office_address,phone,fax,hotline,email,lat,lng) VALUES (?,?,?,?,?,?,?,?,?)", [islno,ioffice_type,ioffice_address,iphone,ifax,ihotline,iemail,ilat,ilng], function(tx, res) {    
					//	alert("Insert Successfully");
					});
				 }, function(e) {
				console.log("ERROR:");
			});								
						});   
						  //End Sink
				
				
				  //Begin Show Branch Info
          
			$rootScope.officeLocation = [];
	  db.transaction(function(tx) {
            tx.executeSql("SELECT * from tb_location;", [], function(tx, res) {
             
                 var len = res.rows.length;
                 if(len>0){
                 	 for (var i = 0; i < len; i++) {
                 	 //	alert("res.rows.item(0).branch_code: " + res.rows.item(i).branch_code + "Branch Name :"+res.rows.item(i).branch_name);
                 	 //listItems.push(res.rows.item(i).branch_code);
                 	  $scope.officeLocation.push({
                 	  	slno: res.rows.item(i).slno, 
                 	  	office_type: res.rows.item(i).office_type,
                 	  	office_address: res.rows.item(i).office_address,
                 	  	phone: res.rows.item(i).phone,
                 	  	 fax: res.rows.item(i).fax,
                 		 hotline: res.rows.item(i).hotline,
                 	  	email: res.rows.item(i).email,
                 		 lat: res.rows.item(i).lat,
						  lng: res.rows.item(i).lng
                 		
                 	  });
                 	  // Make sure to apply scope change so that ng-repeat updates
        		$scope.$apply();
                 	//$scope.categories.push({slno: res.rows.item(i).slno, branch_name: res.rows.item(i).branch_name});
                 	 }
                 	 	
                 	 }
                 })
            });
        
        //End show branch Info
				  
			
			
        }).error(function(data, status, headers, config) {
			 $ionicLoading.hide();
         
		   $ionicPopup.alert({
		 title: "Unable to Perform Your request.Server Is Unreachable! Please Try Later.",
		  //template:'From date'
		  })
			
        });  
		
                }
            }
 	
		  $timeout(function() {
     $ionicLoading.hide();
   }, 10000);
  
  }
  
  //End snc

})

.controller('registrationCtrl', function($base64,$ionicPlatform,$scope, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite,$cordovaDevice) {


	$scope.doRegistration=function(regi){
	
		if(!regi || ! regi.fullname){
		 $ionicPopup.alert({
			  title: 'Please Enter Full Name',
			  //template:'From Date Required !'
			  })
		}else if(!regi || ! regi.address){
		 $ionicPopup.alert({
			  title: 'Please Enter Address',
			  //template:'From Date Required !'
			  })
		}else if(!regi || ! regi.email){
		 $ionicPopup.alert({
			  title: 'Please Enter Email',
			  //template:'From Date Required !'
			  })
		}else if(!regi || ! regi.phone){
		 $ionicPopup.alert({
			  title: 'Please Enter Phone',
			  //template:'From Date Required !'
			  })
		}else{
		
		$ionicLoading.show({
                template: 'Please Wait..'
            });
							$http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/RegistrationSV',
									  params: {clientName:regi.fullname,clientAdd:regi.address,phone: regi.phone,email: regi.email,imei:$cordovaDevice.getUUID()},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											$ionicLoading.hide();
											if(data.regiNodes[0].outCode==0){
											$ionicLoading.hide();
												regi.fullname='';
												regi.address='';
												regi.email='';
												regi.phone='';

												 $ionicPopup.alert({
											  title: data.regiNodes[0].outMessage,
											  //template:'From Date Required !'

											  })
											}else{
											$ionicLoading.hide();
												 $ionicPopup.alert({
											  title: data.regiNodes[0].outMessage,
											  //template:'From Date Required !'
											  })
											}
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
		}
	
	}
})


.controller('ServicesCtrl', function($scope,$state,Chats,$ionicActionSheet, $http, $rootScope, $ionicPopup, $ionicLoading, $timeout) {
 
})

.controller('AppCtrl', function($scope, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter, $ionicHistory,$window) {
	$scope.btnLogOut = function() {	
	
		var confirmPopup = $ionicPopup.confirm({
			 title: 'Log out now?',
			// template: 'Log out now?'
		   });
		   confirmPopup.then(function(res) {               
			 if(res) {
			 $rootScope.userType='';
				
					  $state.go('tabs.signin', {});
			 
			 } else {
			   //console.log('You are not sure');
			 }
		   });
		   
		   
	 }

})
.controller('welcomeCtrl', function($scope, $state,	$rootScope, $ionicPopup) {

	$scope.btnAdminPurchaseOrder = function () {
	 $state.go('app.adminPurchaseOrder');
	}
	

	$scope.btnAllPartyLedger = function () {
	 $state.go('app.allPartyLedger');
	}
	
	
	$scope.btnSingleParty = function () {
	 $state.go('app.singleParty');
	}
	
	$scope.btnLCParty = function () {
	 $state.go('app.lcParty');
	}
	
	$scope.btnAllCustomerLedger = function () {
	 $state.go('app.allCustomerLedger');
	}
	
	$scope.btnSingleCustomerLedger = function () {
	 $state.go('app.singleCustomer');
	}
	
	$scope.btnCashPaymentDeptwise = function () {
		if($rootScope.userType=='A'){
		$state.go('app.cashPaymentDeptwise');
		}else if($rootScope.userType=='E'){
		 $ionicPopup.alert({
				  title: 'You Have No Access.',
				  //template:'To Date Required !'
				  })
		}
	 
	}
	
	
		$scope.btnCashPaymentGrouptwise = function () {
		
		if($rootScope.userType=="A"){
		$state.go('app.cashPaymentGroupWise');
		}else if($rootScope.userType=='E'){
		 $ionicPopup.alert({
				  title: 'You Have No Access.',
				  //template:'To Date Required !'
				  })
		}
		
	}
	
	
	
})


.controller('clientWelcomeCtrl', function($scope, $state) {
	
	$scope.btnPurchaseOrder = function () {
	 $state.go('app.clientPurchaseOrder');
	}
	
		$scope.btnClientPurchaseOrderStatus = function () {
	 $state.go('app.clientPurchaseOrderStatus');
	}
	
	
		$scope.btnViewStatement = function () {
	 $state.go('app.clientViewStatement');
	}
	
	
		$scope.btnUserAccept = function () {
	 $state.go('app.userAcceptAction');
	}


})
.controller('adminPurchaseOrderCtrl',  function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){

$scope.paymentTypeSelect = { select: "-Select One-" };
 $scope.bankNameSelect = { select: "-Select One-" };
 $scope.measureTypeSelect = { select: "-Select One-" };
 
  $scope.measureTypeList = [ { typeName: 'Ton'},{ typeName: 'Kg'}]
									 
	  $scope.myvalue = false;
	   $scope.unitShowhHide = false;
	   
	   
	   //Beign Model
	   $ionicModal.fromTemplateUrl('templates/individualPartyListModal.html', {
    scope: $scope
  }).then(function(individualPartyListModal) {
   // $scope.modal = modal;
	$scope.individualPartyListModal = individualPartyListModal;
  });  
  
  
   $scope.individualPartyListModalShow = function(){
	 // $scope.EFTBankSearchList='';
	 $scope.individualPartyListModal.show();
	 //$rootScope.$apply();
	 }
	 
	 $scope.individualPartyListModalhide = function(){
	 // $scope.EFTBankSearchList='';
	 $scope.individualPartyListModal.hide();
	
	 }
		//End Modal
		
		//Item Selected Listen
		$scope.btnItemSelectName=function(x){
		//alert(x.individualPartyNameID);
		$scope.singlePartyitemSelectedValue=x.individualPartyNameID;
		 $scope.individualPartyListModal.hide();
		}
		//Item Selected Listener
	   //End Modal

	  
	  //Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll

		
		
	$scope.clientpuarchaseModelHide=function(){

	 $scope.productRateModel.hide();
	}
		
	$ionicModal.fromTemplateUrl('templates/productRateModel.html', {
    scope: $scope
  }).then(function(productRateModel) {
   // $scope.modal = modal;
	$scope.productRateModel = productRateModel;
  });  
  
  
		   $scope.btnPruductRateModelShow = function(){
			 // $scope.EFTBankSearchList='';
			 
			 
				$ionicLoading.show({
                template: 'Please Wait..'
            });
			
			 		
									$http({
													method: 'POST',									  
										url:  $rootScope.getServerIp+'AimsAppsConnectivity/ProductRateSV',
																								//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																													  //type:'JSON',
												headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												$ionicLoading.hide();															
											$scope.productRateList=data;	
																													//alert('success');
																												
										}).error(function(data, status, headers, config) {
											 $ionicLoading.hide();
												$ionicPopup.alert({
												title:'Unable to perform your request. Please Check your Device Internet Connection',
																												  //template:'From date'
												 })
																												
										});

					  $timeout(function() {
					 $ionicLoading.hide();
				   }, 5000);
			 $scope.productRateModel.show();
			 //$rootScope.$apply();
			 }
			 
			  $scope.btnProductItemSelectName=function(x){
			  $scope.selectedProductCode=x.productCOde;
			    $scope.selectedProductName=x.productName;
				 $scope.selectedProductRate=x.productRate;
				
				 $scope.productRateModel.hide();
			  }
			  
			   $scope.onChangePaymentType=function(purchaseOrder){
			   if(purchaseOrder.paymentTypeItem=="CQ"){
			     $scope.myvalue = true;	
			   }else{
			     $scope.myvalue = false;	
			   }
			   }
			   
			    $scope.onMeasureType=function(purchaseOrder){
			   if(purchaseOrder.measureTypeItem==""){
			   	   $scope.unitShowhHide = false;
			   }else{
			  
				   $scope.unitShowhHide = true;
			   }
			   }
			  
			 $scope.changeValue=function(purchaseOrder){
				
				if(purchaseOrder.measureTypeItem=="Ton"){
				
				
					$scope.onChangeTotalPrice= $scope.selectedProductRate*purchaseOrder.qty;				
					 
				}else if(purchaseOrder.measureTypeItem=="Kg"){
				$scope.onChangeTotalPrice= ($scope.selectedProductRate/1000)*purchaseOrder.qty;	
				}
			 
			 } 
			 
			 
			 $scope.btnAddList=function(purchaseOrder){
			 
			 if(!purchaseOrder || ! purchaseOrder.purchasedate){
				 $ionicPopup.alert({
				  title: 'Purchase Date Is Required !',
				  //template:'From date'
				  })
				
				}else if($scope.singlePartyitemSelectedValue==null ||$scope.singlePartyitemSelectedValue==''){
				$ionicPopup.alert({
				  title: 'Please Search Party Name And Select.',
				  //template:'From date'
				  })
				}else if(!purchaseOrder || ! purchaseOrder.paymentTypeItem){
					$ionicPopup.alert({
				  title: 'Please Select Payment Type.',
				  //template:'From date'
				  })
				}else if(!purchaseOrder || ! purchaseOrder.bankNameItem && $scope.myvalue==true ){
				$ionicPopup.alert({
				  title: 'Please Select Bank Name.',
				  //template:'From date'
				  })
				}else if( $scope.selectedProductName==null ||  $scope.selectedProductName==""){
				$ionicPopup.alert({
				  title: 'Please Search Product Name And Select One',
				  //template:'From date'
				  })
				}else if(!purchaseOrder || ! purchaseOrder.measureTypeItem){
					$ionicPopup.alert({
				 title: 'Please Select Measure Type.',
				  //template:'From date'
				  })
				}else if(!purchaseOrder || ! purchaseOrder.qty){
					$ionicPopup.alert({
				 title: 'Please Enter QTY.',
				  //template:'From date'
				  })
				}else {
				
						var pdate = $filter('date')(new Date( purchaseOrder.purchasedate), 'dd/MM/yyyy');
						
						
							$ionicLoading.show({
                template: 'Please Wait..'
            });
					//Begin add list
					 $http({
						  method: 'POST',
									  
							url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderderSV',
									  params: {sessionID:$rootScope.sessionID,userID:$rootScope.userID,doctype:purchaseOrder.paymentTypeItem,purchaseOderDate:pdate,productCode: $scope.selectedProductCode,mesasurType:purchaseOrder.measureTypeItem,unitPrice:$scope.onChangeTotalPrice,qty:purchaseOrder.qty,customerID:$scope.singlePartyitemSelectedValue},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										if(data.purChaseOderNodes[0].outCode == 0) {
										
										$scope.clientPurchasewaitingOrderList="";
									
										
										//Begin list
										 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderWaitingListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.clientPurchasewaitingOrderList=data;
											$ionicLoading.hide();
											//begin Clear
											//purchaseOrder.purchasedate = '';
										purchaseOrder.paymentTypeItem = '';
										purchaseOrder.bankNameItem = '';
										 $scope.selectedProductName='';
										purchaseOrder.measureTypeItem='';
										 purchaseOrder.qty='';
										$scope.onChangeTotalPrice='';
										 $scope.selectedProductCode='';
										  $scope.selectedProductRate='';
										 $scope.paymentTypeSelect = { select: "-Select One-" };
										$scope.bankNameSelect = { select: "-Select One-" };
										$scope.measureTypeSelect = { select: "-Select One-" };
										  $scope.myvalue = false;
										$scope.unitShowhHide = false;
										$scope.singlePartyitemSelectedValue='';
										 //End Clear
											
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
										//end list
										
										}else{
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:data.purChaseOderNodes[0].outMessage,
																	 
										})
										}
											
											
										
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
					//End add list
				}
			 
			 }
			 
			 
		$scope.btnDeletItem=function(x){
		
		var confirmPopup = $ionicPopup.confirm({
			 title: 'Are You To Delete '+x.slNo+'?',
			// template: 'Log out now?'
		   });
		   confirmPopup.then(function(res) {               
			 if(res) {
			 	$ionicLoading.show({
                template: 'Please Wait..'
            });
				
						 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderDeleteRowSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID,serid:x.serName},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");     
											
											
											//$scope.clientPurchasewaitingOrderList=data;
											//$ionicLoading.hide();
											//Show List
												
											if(data.purchaseOderDeleteRowNodes[0].out_code == 0) {
												$scope.clientPurchasewaitingOrderList="";
												
											$http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderWaitingListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.clientPurchasewaitingOrderList=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
											}
											else {
											$ionicLoading.hide();
											}
											//Show list
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
			 
			 } else {
			   //console.log('You are not sure');
			 }
		   });
		}
		
		$scope.btnPurchaseOrderbubmit=function(){
		
		$ionicLoading.show({
                template: 'Please Wait..'
            });
			$http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderExecution',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											if(data.purChaseOderExecutionNodes[0].outCode==0){
											$scope.clientPurchasewaitingOrderList=data;
											$ionicLoading.hide();
												$ionicPopup.alert({
												 title:data.purChaseOderExecutionNodes[0].outMessage,
																			  //template:'From date'
												})
											}else{
											$ionicLoading.hide();
												$ionicPopup.alert({
												 title:data.purChaseOderExecutionNodes[0].outMessage,
																			  //template:'From date'
												})
											}
											$ionicLoading.hide();
											
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
		}
		
		$scope.btnPurchaseOrderClear=function(purchaseOrder){
			//
			purchaseOrder.purchasedate = '';
										purchaseOrder.paymentTypeItem = '';
										purchaseOrder.bankNameItem = '';
										 $scope.selectedProductName='';
										purchaseOrder.measureTypeItem='';
										 purchaseOrder.qty='';
										$scope.onChangeTotalPrice='';
										 $scope.selectedProductCode='';
										  $scope.selectedProductRate='';
										 $scope.paymentTypeSelect = { select: "-Select One-" };
										$scope.bankNameSelect = { select: "-Select One-" };
										$scope.measureTypeSelect = { select: "-Select One-" };
										  $scope.myvalue = false;
											$scope.unitShowhHide = false;
											$scope.singlePartyitemSelectedValue='';
		}
 

})
.controller('allPartyLedgerCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite) {


	
	$scope.AllPartyLdedgerSearchAction = function (search) {
	 if(!search || ! search.allPartyFromDate){
			 $ionicPopup.alert({
			  title: 'From Date Required !',
			  //template:'From Date Required !'
			  })
			//alert("Please Enter Your User ID");
			}else if(!search || ! search.allPartyToDate){
				 $ionicPopup.alert({
			  title: 'To Date Required !',
			  //template:'To Date Required !'
			  })
			}else{
			
				$ionicLoading.show({
                template: 'Please Wait..'
            });
			
			var f_from_date = $filter('date')(new Date(search.allPartyFromDate), 'dd/MM/yyyy');
		 var f_to_date = $filter('date')(new Date(search.allPartyToDate),'dd/MM/yyyy');
				//Beging Search
					 $http({
					  method: 'POST',
					  
					  url:  $rootScope.getServerIp+'AimsAppsConnectivity/AllPartyErrorCodeSV',
					  params: {mailID:'admin@rrm.com',sessionID: $rootScope.sessionID,fromDate:f_from_date,toDate:f_to_date},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success...");            
							
							if(data.partyLedgerErrorNodes[0].errorCode == 0) {
							//params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
								//Begin Search List
												
									 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/AllPartyLedgerListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.allpartyListValue=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
								//End Search List
								
								
							
							}else{
							$ionicLoading.hide();
							}
							
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
						})
					}); 
				//End Search
			}
			
		 $timeout(function() {
			 $ionicLoading.hide();
		   }, 10000);
	}
	


	 var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }
	
	$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.allpartyListValue='';

		  });
})

.controller('singlePartyCtrl', function($base64,$ionicPlatform, $ionicScrollDelegate,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite) {

	
	 //Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll


	$ionicModal.fromTemplateUrl('templates/individualPartyListModal.html', {
    scope: $scope
  }).then(function(individualPartyListModal) {
   // $scope.modal = modal;
	$scope.individualPartyListModal = individualPartyListModal;
  });  
  
  
   $scope.individualPartyListModalShow = function(){
	 // $scope.EFTBankSearchList='';
	 $scope.individualPartyListModal.show();
	 //$rootScope.$apply();
	 }
	 
	 $scope.individualPartyListModalhide = function(){
	 // $scope.EFTBankSearchList='';
	 $scope.individualPartyListModal.hide();
	
	 }
		//End Modal
		
		//Item Selected Listen
		$scope.btnItemSelectName=function(x){
		//alert(x.individualPartyNameID);
		$scope.singlePartyitemSelectedValue=x.individualPartyNameID;
		 $scope.individualPartyListModal.hide();
		}
		//Item Selected Listener
		
		//Begin Search
		
		$scope.doSearachAction=function(singleParty){
		
				$rootScope.singlePartyListStatement='';
				
				if(!singleParty || !singleParty.fromDate){
				 $ionicPopup.alert({
					  title: 'From Date Is Required',
					  //template:'From date'
					  })
				}else if(!singleParty||!singleParty.toDate){
					$ionicPopup.alert({
					title:'To Date Is Required !',
					})
				}else{
				
					var f_from_date = $filter('date')(new Date(singleParty.fromDate), 'dd/MM/yyyy');
				    var f_to_date = $filter('date')(new Date(singleParty.toDate),'dd/MM/yyyy');
					
					$ionicLoading.show({
                template: 'Please Wait..'
            });
					
					//begin execution
					 $http({
					  method: 'POST',
					  
					  url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualSearchPartyLedgerErrorCodeSV',
					  params: {mailID:'admin@rrm.com',sessionID: $rootScope.sessionID,partyID:$scope.singlePartyitemSelectedValue,fromDate:f_from_date,toDate:f_to_date,userID:$rootScope.userID},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success...");            
							
							if(data.IndvidualLedgerErrorNodes[0].errorCode == 0) {
							//params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
								//Begin Search List
												
									 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualSearchPartyLedgerListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.singlePartyListStatement=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
								//End Search List
								
								
							
							}else{
							$ionicLoading.hide();
								$ionicPopup.alert({
								title:data.IndvidualLedgerErrorNodes[0].errorMessage,
								})
							}
							
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
						})
					}); 
					//end execution
				 
				}
				
				 $timeout(function() {
     $ionicLoading.hide();
   }, 10000);
				
		}
		//End Search
		
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.singlePartyListStatement='';

		  });
	
})
.controller('lcPartyCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite){

	

	//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll


		$scope.doSearachAction=function(lc){
			if(! lc || ! lc.fromDate){
			$ionicPopup.alert({
			title:'Please Enter From Date.',
			})
			}else if(! lc || ! lc.toDate){
			$ionicPopup.alert({
			title:'Please Enter To Date.',
			})
			}else{
					$ionicLoading.show({
                template: 'Please Wait..'
            });
			
				var f_from_date = $filter('date')(new Date(lc.fromDate), 'dd/MM/yyyy');
				    var f_to_date = $filter('date')(new Date(lc.toDate),'dd/MM/yyyy');
					
					//begin execution
					 $http({
					  method: 'POST',
					  
					  url:  $rootScope.getServerIp+'AimsAppsConnectivity/LCErrorCodeSV',
					  params: {mailID:'admin@rrm.com',sessionID: $rootScope.sessionID,fromDate:f_from_date,toDate:f_to_date,userID:$rootScope.userID},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success...");            
							
							if(data.lcPartyCodeNodes[0].out_code == 0) {
							//params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
								//Begin Search List
										$scope.lcPartyList="";
										
									 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/LCPartyListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.lcPartyList=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
								//End Search List
								
								
							
							}else{
							$ionicLoading.hide();
								$ionicPopup.alert({
								title:data.lcPartyCodeNodes[0].out_message,
								})
							}
							
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
						})
					}); 
					//end execution
					
					$timeout(function() {
				$ionicLoading.hide();
			   }, 10000);
			}
		}
		
		//Remove view data
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.lcPartyList='';

		  });
	
})
.controller('allCustomerLedgerCtrl', function($base64, $ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite){

		

	//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll

		$scope.AllCustomerLdedgerSearchAction=function(search){
		
			if(! search || ! search.allCustomerFromDate){
			$ionicPopup.alert({
			title:'Please Enter From Date.',
			})
			}else if(! search || !search.allCustomerToDate){
			$ionicPopup.alert({
			title:'Please Enter To Date.',
			})
			}else{
			
				$ionicLoading.show({
                template: 'Please Wait..'
            });
			
				var f_from_date = $filter('date')(new Date(search.allCustomerFromDate), 'dd/MM/yyyy');
				    var f_to_date = $filter('date')(new Date(search.allCustomerToDate),'dd/MM/yyyy');
					
					//begin execution
					 $http({
					  method: 'POST',
					  
					  url:  $rootScope.getServerIp+'AimsAppsConnectivity/AllCustomerErrorCodeSV',
					  params: {mailID:'admin@rrm.com',sessionID: $rootScope.sessionID,fromDate:f_from_date,toDate:f_to_date},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success...");            
							
							if(data.customerLedgerErrorNodes[0].errorCode == 0) {
							//params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
								//Begin Search List
												
									 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/AllCustomerLedgerListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.singleAllCustomerListStatement=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
								//End Search List
								
								
							
							}else{
							$ionicLoading.hide();
							}
							
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
						})
					}); 
					//end execution
			}
			
				$timeout(function() {
				$ionicLoading.hide();
			   }, 10000)
		
		}
		
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.singleAllCustomerListStatement='';

		  });
	
})
.controller('singleCustomerCtrl', function($base64,$ionicPlatform,$ionicScrollDelegate,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite){

//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll

		//Begin Modal
		$ionicModal.fromTemplateUrl('templates/singleCustomerListModal.html', {
			scope: $scope
		  }).then(function(singleCustomerListModal) {
		   // $scope.modal = modal;
			$scope.singleCustomerListModal = singleCustomerListModal;
		  });  
		  
		  
		   $scope.singleCustomerListModalShow = function(){
			 // $scope.EFTBankSearchList='';
			 $scope.singleCustomerListModal.show();
			 //$rootScope.$apply();
			 }
			 
			 $scope.singleCustomerListModalhide = function(){
			 // $scope.EFTBankSearchList='';
			 $scope.singleCustomerListModal.hide();
			
			 }
	//End Modal

	//Beign Selected item
	$scope.btnSingleCustomerSelectedItem=function(x){
	$scope.singleCustomer={customerIdName:x.individualCustomerNameID};
	 $scope.singleCustomerListModal.hide();
	}
	//End Selected Item
	
	$scope.doSearachAction=function(singleCustomer){
		if(!singleCustomer || !singleCustomer.customerIdName){
		$ionicPopup.alert({
		title:'Please Enter Customer ID',
		});
		}else if(!singleCustomer || !singleCustomer.fromDate){
		$ionicPopup.alert({
		title:'Please Enter From Date .',
		});
		}else if(!singleCustomer || !singleCustomer.toDate){
		$ionicPopup.alert({
		title:'Please Enter To Date .',
		});
		}else{
		
				$ionicLoading.show({
                template: 'Please Wait..'
            });
			
				var f_from_date = $filter('date')(new Date(singleCustomer.fromDate), 'dd/MM/yyyy');
				    var f_to_date = $filter('date')(new Date(singleCustomer.toDate),'dd/MM/yyyy');
			//Begin Execution
			 $http({
					  method: 'POST',
					  
					  url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualCustomerSearchExecutionErrorCode',
					  params: {mailID:'admin@rrm.com',sessionID: $rootScope.sessionID,customerID:singleCustomer.customerIdName,fromDate:f_from_date,toDate:f_to_date,userID:$rootScope.userID},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success...");            
							
							if(data.IndvidualCustomerErrorNodes[0].errorCode == 0) {
							//params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
								//Begin Search List
												
									 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualCustomerExecutionListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.singleCustomerListStatement=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
								//End Search List
								
								
							
							}else{
							$ionicLoading.hide();
								$ionicPopup.alert({
							title:data.IndvidualCustomerErrorNodes[0].out_message,
							});
							}
							
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
						})
					});
			//End Execution
		}
		
			$timeout(function() {
				$ionicLoading.hide();
			   }, 10000)
	
	}
	
	//Remove view data
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.singleCustomerListStatement='';

		  });
	
})


.controller('cashAmountListCtrl', function($base64,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){
 $scope.items = [{id:0,textTilte:'Cash Payment Group Wise'},{id:1,textTilte:'Cash Payment Unit Wise'}];
 
		 $scope.selectedItemAction =function(item){
				//alert(item.id);
				if(item.id==0){
								// $scope.btnFundTransfer = function () {
					 $state.go('app.cashPaymentGroupWise');
					// $state.go('app.fundTransferList');
				 // }
				}else if(item.id==1){
				 $state.go('app.EFTTransfer');
				}else{
				//
				}
		 }
})

.controller('cashPaymentDeptwiseCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter,$cordovaSQLite){
 


		//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll




 $scope.cashPaymentdept = { select: "-Select One-" };
 
	$scope.doSearachAction=function(cashPaymentdept){
		if(! cashPaymentdept || ! cashPaymentdept.cashPaymentExpanseName){
		$ionicPopup.alert({
				title:'Please Select Party Name',
				})
		}else if(! cashPaymentdept || ! cashPaymentdept.fromDate){
		$ionicPopup.alert({
				title:'Please Enter From Date.',
				})
		}else if(! cashPaymentdept || ! cashPaymentdept.toDate){
		$ionicPopup.alert({
				title:'Please Enter To Date.',
				})
		}else {
		
			$ionicLoading.show({
                template: 'Please Wait..'
            });
		
		var f_from_date = $filter('date')(new Date( cashPaymentdept.fromDate), 'dd/MM/yyyy');
				    var f_to_date = $filter('date')(new Date(cashPaymentdept.toDate),'dd/MM/yyyy');
					
					//begin execution
					 $http({
					  method: 'POST',
					  
					  url:  $rootScope.getServerIp+'AimsAppsConnectivity/CashPayemntDepWiseErrorCodeSV',
					  params: {mailID:'admin@rrm.com',sessionID: $rootScope.sessionID,payFrom:cashPaymentdept.cashPaymentExpanseName,fromDate:f_from_date,toDate:f_to_date,userID:$rootScope.userID},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success...");            
							
							if(data.cashPaymentDeptWiseCodeNodes[0].errorCode == 0) {
							//params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
								//Begin Search List
										$scope.cashPaymentDeptWiseList="";
										
									 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/CashpaymentDeptWiseListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.cashPaymentDeptWiseList=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
								//End Search List
								
								
							
							}else{
							$ionicLoading.hide();
								$ionicPopup.alert({
								title:data.cashPaymentDeptWiseCodeNodes[0].out_message,
								})
							}
							
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
						})
					}); 
					//end execution
		
		
		}
		
		$timeout(function() {
				$ionicLoading.hide();
			   }, 10000)
	
	}
	
	//Remove view data
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.cashPaymentDeptWiseList='';

		  });

})
.controller('cashPaymentGroupWiseCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){


//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll

	$scope.btnSearchCashAmountGroupWise=function(search){
		
			if(! search || ! search.cashFromDate){
			$ionicPopup.alert({
			title:'Please Enter From Date.',
			})
			}else if(! search || !search.cashToDate){
			$ionicPopup.alert({
			title:'Please Enter To Date.',
			})
			}else{
			
				$ionicLoading.show({
                template: 'Please Wait..'
            });
			
				var f_from_date = $filter('date')(new Date(search.cashFromDate), 'dd/MM/yyyy');
				    var f_to_date = $filter('date')(new Date(search.cashToDate),'dd/MM/yyyy');
					
					//begin execution
					 $http({
					  method: 'POST',
					  
					  url:  $rootScope.getServerIp+'AimsAppsConnectivity/CashPaymentGroupWiseErrorCodeSV',
					  params: {mailID:'admin@rrm.com',sessionID: $rootScope.sessionID,fromDate:f_from_date,toDate:f_to_date},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success...");            
							
							if(data.cashPaymentGroupWiseNodes[0].errorCode == 0) {
							//params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
								//Begin Search List
												
									 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/CashPaymentGroupWiseListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.cashAmountDepWiseList=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
								//End Search List
								
								
							
							}else{
							$ionicLoading.hide();
							$ionicPopup.alert({
						 title:data.cashPaymentGroupWiseNodes[0].out_message,
													  //template:'From date'
						})
							}
							
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
						})
					}); 
					//end execution
			}
			
			$timeout(function() {
			$ionicLoading.hide();
			   }, 10000)
		
		}
		
			//Remove view data
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.cashAmountDepWiseList='';

		  });
})

.controller('clientPurchaseOrderCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){



//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll



 $scope.paymentTypeSelect = { select: "-Select One-" };
 $scope.bankNameSelect = { select: "-Select One-" };
 $scope.measureTypeSelect = { select: "-Select One-" };
 
  $scope.measureTypeList = [ { typeName: 'Ton'},{ typeName: 'Kg'}]
									 
	  $scope.myvalue = false;
	   $scope.unitShowhHide = false;

	  
		
		
	$scope.clientpuarchaseModelHide=function(){

	 $scope.productRateModel.hide();
	}
		
	$ionicModal.fromTemplateUrl('templates/productRateModel.html', {
    scope: $scope
  }).then(function(productRateModel) {
   // $scope.modal = modal;
	$scope.productRateModel = productRateModel;
  });  
  
  
		   $scope.btnPruductRateModelShow = function(){
			 // $scope.EFTBankSearchList='';
			 
			 
				$ionicLoading.show({
                template: 'Please Wait..'
            });
			
			 		
									$http({
													method: 'POST',									  
										url:  $rootScope.getServerIp+'AimsAppsConnectivity/ProductRateSV',
																								//params: {mailID:$rootScope.mailID,sessionID:$rootScope.sessionID},
																													  //type:'JSON',
												headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												$ionicLoading.hide();															
											$scope.productRateList=data;	
																													//alert('success');
																												
										}).error(function(data, status, headers, config) {
											 $ionicLoading.hide();
												$ionicPopup.alert({
												title:'Unable to perform your request. Please Check your Device Internet Connection',
																												  //template:'From date'
												 })
																												
										});

					  $timeout(function() {
					 $ionicLoading.hide();
				   }, 5000);
			 $scope.productRateModel.show();
			 //$rootScope.$apply();
			 }
			 
			  $scope.btnProductItemSelectName=function(x){
			  $scope.selectedProductCode=x.productCOde;
			    $scope.selectedProductName=x.productName;
				 $scope.selectedProductRate=x.productRate;
				
				 $scope.productRateModel.hide();
			  }
			  
			   $scope.onChangePaymentType=function(purchaseOrder){
			   if(purchaseOrder.paymentTypeItem=="CQ"){
			     $scope.myvalue = true;	
			   }else{
			     $scope.myvalue = false;	
			   }
			   }
			   
			    $scope.onMeasureType=function(purchaseOrder){
			   if(purchaseOrder.measureTypeItem==""){
			   	   $scope.unitShowhHide = false;
			   }else{
			  
				   $scope.unitShowhHide = true;
			   }
			   }
			  
			 $scope.changeValue=function(purchaseOrder){
				
				if(purchaseOrder.measureTypeItem=="Ton"){
				
				
					$scope.onChangeTotalPrice= $scope.selectedProductRate*purchaseOrder.qty;				
					 
				}else if(purchaseOrder.measureTypeItem=="Kg"){
				$scope.onChangeTotalPrice= ($scope.selectedProductRate/1000)*purchaseOrder.qty;	
				}
			 
			 } 
			 
			 
			 $scope.btnAddList=function(purchaseOrder){
			 
			 if(!purchaseOrder || ! purchaseOrder.purchasedate){
				 $ionicPopup.alert({
				  title: 'Purchase Date Is Required !',
				  //template:'From date'
				  })
				
				}else if(!purchaseOrder || ! purchaseOrder.paymentTypeItem){
					$ionicPopup.alert({
				  title: 'Please Select Payment Type.',
				  //template:'From date'
				  })
				}else if(!purchaseOrder || ! purchaseOrder.bankNameItem && $scope.myvalue==true ){
				$ionicPopup.alert({
				  title: 'Please Select Bank Name.',
				  //template:'From date'
				  })
				}else if( $scope.selectedProductName==null ||  $scope.selectedProductName==""){
				$ionicPopup.alert({
				  title: 'Please Search Product Name And Select One',
				  //template:'From date'
				  })
				}else if(!purchaseOrder || ! purchaseOrder.measureTypeItem){
					$ionicPopup.alert({
				 title: 'Please Select Measure Type.',
				  //template:'From date'
				  })
				}else if(!purchaseOrder || ! purchaseOrder.qty){
					$ionicPopup.alert({
				 title: 'Please Enter QTY.',
				  //template:'From date'
				  })
				}else {
				
						var pdate = $filter('date')(new Date( purchaseOrder.purchasedate), 'dd/MM/yyyy');
						
						
							$ionicLoading.show({
                template: 'Please Wait..'
            });
					//Begin add list
					 $http({
						  method: 'POST',
									  
							url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderderSV',
									  params: {sessionID:$rootScope.sessionID,userID:$rootScope.userID,doctype:purchaseOrder.paymentTypeItem,purchaseOderDate:pdate,productCode: $scope.selectedProductCode,mesasurType:purchaseOrder.measureTypeItem,unitPrice:$scope.onChangeTotalPrice,qty:purchaseOrder.qty,customerID:'-00'},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										if(data.purChaseOderNodes[0].outCode == 0) {
										
										$scope.clientPurchasewaitingOrderList="";
									
										
										//Begin list
										 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderWaitingListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.clientPurchasewaitingOrderList=data;
											$ionicLoading.hide();
											//begin Clear
											//purchaseOrder.purchasedate = '';
										purchaseOrder.paymentTypeItem = '';
										purchaseOrder.bankNameItem = '';
										 $scope.selectedProductName='';
										purchaseOrder.measureTypeItem='';
										 purchaseOrder.qty='';
										$scope.onChangeTotalPrice='';
										 $scope.selectedProductCode='';
										  $scope.selectedProductRate='';
										 $scope.paymentTypeSelect = { select: "-Select One-" };
										$scope.bankNameSelect = { select: "-Select One-" };
										$scope.measureTypeSelect = { select: "-Select One-" };
										  $scope.myvalue = false;
										$scope.unitShowhHide = false;
										 //End Clear
											
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
										//end list
										
										}else{
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:data.purChaseOderNodes[0].outMessage,
																	 
										})
										}
											
											
										
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
					//End add list
				}
			 
			 }
			 
			 
		$scope.btnDeletItem=function(x){
		
		var confirmPopup = $ionicPopup.confirm({
			 title: 'Are You To Delete '+x.slNo+'?',
			// template: 'Log out now?'
		   });
		   confirmPopup.then(function(res) {               
			 if(res) {
			 	$ionicLoading.show({
                template: 'Please Wait..'
            });
				
						 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderDeleteRowSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID,serid:x.serName},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");     
											
											
											//$scope.clientPurchasewaitingOrderList=data;
											//$ionicLoading.hide();
											//Show List
												
											if(data.purchaseOderDeleteRowNodes[0].out_code == 0) {
												$scope.clientPurchasewaitingOrderList="";
												
											$http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderWaitingListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											$scope.clientPurchasewaitingOrderList=data;
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
											}
											else {
											$ionicLoading.hide();
											}
											//Show list
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
			 
			 } else {
			   //console.log('You are not sure');
			 }
		   });
		}
		
		$scope.btnPurchaseOrderbubmit=function(){
		
		$ionicLoading.show({
                template: 'Please Wait..'
            });
			$http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderExecution',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										//alert("success...");            
											
											//$scope.clientPurchasewaitingOrderList=data;
											//$ionicLoading.hide();
											
											if(data.purChaseOderExecutionNodes[0].outCode==0){
											$scope.clientPurchasewaitingOrderList=data;
											$ionicLoading.hide();
												$ionicPopup.alert({
												 title:data.purChaseOderExecutionNodes[0].outMessage,
																			  //template:'From date'
												})
											}else{
											$ionicLoading.hide();
												$ionicPopup.alert({
												 title:data.purChaseOderExecutionNodes[0].outMessage,
																			  //template:'From date'
												})
											}
											$ionicLoading.hide();
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
		}
		
		$scope.btnPurchaseOrderClear=function(purchaseOrder){
			//
			purchaseOrder.purchasedate = '';
										purchaseOrder.paymentTypeItem = '';
										purchaseOrder.bankNameItem = '';
										 $scope.selectedProductName='';
										purchaseOrder.measureTypeItem='';
										 purchaseOrder.qty='';
										$scope.onChangeTotalPrice='';
										 $scope.selectedProductCode='';
										  $scope.selectedProductRate='';
										 $scope.paymentTypeSelect = { select: "-Select One-" };
										$scope.bankNameSelect = { select: "-Select One-" };
										$scope.measureTypeSelect = { select: "-Select One-" };
										  $scope.myvalue = false;
											$scope.unitShowhHide = false;
		}
 
})

.controller('clientPurchaseOrderStatusCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){


//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll


	$scope.doSearachAction=function(orderStatus){
	
		if(!orderStatus || ! orderStatus.fromDate){
			$ionicPopup.alert({
				 title: 'Please Enter From Date.',
				  //template:'From date'
				  })
		}else if(!orderStatus || ! orderStatus.toDate){
		$ionicPopup.alert({
				 title: 'Please Enter To Date.',
				  //template:'From date'
				  })
		}else{
		
		$ionicLoading.show({
                template: 'Please Wait..'
            });
			//Begin add list
				var f_fromdate = $filter('date')(new Date( orderStatus.fromDate), 'dd/MM/yyyy');
				var f_todate = $filter('date')(new Date( orderStatus.toDate), 'dd/MM/yyyy');
				
					 $http({
						  method: 'POST',
									  
							url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderClientDetailsSV',
									  params: {mailID:'',sessionID:$rootScope.sessionID,userID:$rootScope.userID,fromDate:f_fromdate ,toDate:f_todate},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										if(data.purchaseOderClientDetailsNode[0].out_code == 0) {
										
									$scope.clientPurchaseOrderStatusList="";
									
										
										//Begin list
										 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/PurchaseOderClientStatusListSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										            
											
											$scope.clientPurchaseOrderStatusList=data;
											$ionicLoading.hide();
											
											
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
										//end list
										
										}else{
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:data.purchaseOderClientDetailsNode[0].out_message,
																	 
										})
										}
											
											
										
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
					//End add list
		}
	}
	
		$scope.btnOrderDeatailsGo=function(x){
		$rootScope.orderStutusDetailsDocID=x.documentID;
		$state.go('app.clientPurchaseOrderStatusDetails');
	}
	
	

})



.controller('clientPurchaseOrderStatusDetailsCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){

//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll




$ionicLoading.show({
                template: 'Please Wait..'
            });
		
				
					 $http({
						  method: 'POST',
									  
							url:  $rootScope.getServerIp+'AimsAppsConnectivity/ClientStatusDetailsSV',
									  params: {mailID:'aimstech@gmail.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID,documentID:$rootScope.orderStutusDetailsDocID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										if(data.statusDetailsNode[0].out_code == 0) {
										
										$scope.clientPurchaseOrderStatusDeatilsList="";
									
										
										//Begin list
										 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/ClientStatusDetailsListSV',
									  params: {mailID:'aimstech@gmail.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										         
											
											$scope.clientPurchaseOrderStatusDeatilsList=data;
											$ionicLoading.hide();
											
											
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
										//end list
										
										}else{
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:data.statusDetailsNode[0].out_message,
																	 
										})
										}
											
											
										
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
					//End add list
					
					
					  $timeout(function() {
					 $ionicLoading.hide();
				   }, 10000);
		

		//Remove view data
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.clientPurchaseOrderStatusDeatilsList='';

		  });
})

.controller('clientViewStatementCtrl', function($base64,$ionicPlatform,$ionicScrollDelegate,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){

	//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll



	$scope.doSearachAction=function(viewStatement){
		if(!viewStatement || ! viewStatement.fromDate){
		$ionicPopup.alert({
				 title: 'Please Enter From Date.',
				  //template:'From date'
				  })
		}else if(!viewStatement || ! viewStatement.toDate){
		$ionicPopup.alert({
				 title: 'Please Enter To Date.',
				  //template:'From date'
				  })
		}else{
		
		
		
		var f_fromdate = $filter('date')(new Date(viewStatement.fromDate), 'dd/MM/yyyy');
		var f_todate = $filter('date')(new Date(viewStatement.toDate), 'dd/MM/yyyy');
		
		$ionicLoading.show({
                template: 'Please Wait..'
            });
		
		
		
		 $http({
						  method: 'POST',
									  
							url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualCustomerSearchExecutionErrorCode',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,customerID:'-00',userID:$rootScope.userID,fromDate:f_fromdate ,toDate:f_todate},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										if(data.IndvidualCustomerErrorNodes[0].errorCode == 0) {
										
											$scope.clientViewStatementList="";
											
												
												//Begin list
												 $http({
											  method: 'POST',
											  
											  url:  $rootScope.getServerIp+'AimsAppsConnectivity/IndividualCustomerExecutionListSV',
											  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID},
											  //type:'JSON',
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
															
													
													$scope.clientViewStatementList=data;
													$ionicLoading.hide();
													
													
													
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												$ionicLoading.hide();
												$ionicPopup.alert({
												 title:'Unable to perform your request. Please Check your Device Internet Connection',
																			  //template:'From date'
												})
											}); 
										//end list
										
										}else{
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:data.IndvidualCustomerErrorNodes[0].out_message,
																	 
										})
										}
											
											
										
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
					//End add list
		}
			  $timeout(function() {
					 $ionicLoading.hide();
				   }, 10000);
		
	}
	
	//Remove view data
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.clientPurchaseOrderStatusDeatilsList='';

		  });

})


.controller('userAcceptActionCtrl', function($base64,$ionicScrollDelegate,$ionicPlatform,$scope,$ionicModal, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup,$filter){

//Begin table scroll
	   var adjusting = false;
    $scope.scrollMirror1 = function(from, to) {
    if (adjusting) {
      adjusting = false;
    } else {
      // Mirroring zoom level
      var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
      var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

      if (zoomFrom != zoomTo) {
        $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
      }

      // Mirroring left position
      $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
      $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

      adjusting = true;
    }
  }

	  //End table Scroll


	$scope.doUserAcceptAction=function(userAccpt){
			if(!userAccpt || ! userAccpt.fromDate){
			$ionicPopup.alert({
					 title: 'Please Enter From Date.',
					  //template:'From date'
					  })
			}else if(!userAccpt || ! userAccpt.toDate){
				$ionicPopup.alert({
					 title: 'Please Enter To Date.',
					  //template:'From date'
					  })
			}else{
				
				$scope.f_fromdate = $filter('date')(new Date(userAccpt.fromDate), 'dd/MM/yyyy');
				$scope.f_todate = $filter('date')(new Date(userAccpt.toDate), 'dd/MM/yyyy');
				
				$ionicLoading.show({
						template: 'Please Wait..'
					});
					
					//begin List
					$http({
						  method: 'POST',
									  
							url:  $rootScope.getServerIp+'AimsAppsConnectivity/UserAccptanceDetailTagCodceSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID,fromDate:$scope.f_fromdate ,toDate:$scope.f_todate},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										if(data.userAcceptanceDetailsCodeNodes[0].out_code == 0) {
										
											$scope.clientUserAccptList="";
											
												
												//Begin list
												 $http({
											  method: 'POST',
											  
											  url:  $rootScope.getServerIp+'AimsAppsConnectivity/UserAceptanceSV',
											  params: {sessionID:$rootScope.sessionID,userID:$rootScope.userID},
											  //type:'JSON',
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
															
													
													$scope.clientUserAccptList=data;
													$ionicLoading.hide();
													
													
													
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												$ionicLoading.hide();
												$ionicPopup.alert({
												 title:'Unable to perform your request. Please Check your Device Internet Connection',
																			  //template:'From date'
												})
											}); 
										//end list
										
										}else{
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:data.userAcceptanceDetailsCodeNodes[0].out_message,
																	 
										})
										}
											
											
										
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
					//end list
					
					
					  $timeout(function() {
					 $ionicLoading.hide();
				   }, 10000);
		
			}
			
			//Remove view data
		$scope.$on('$ionicView.beforeLeave', function(){
				// alert("Before Leaving");	  
					$scope.clientUserAccptList='';

		  });
	}
	
	
	$scope.btnUserAcceptAction=function(x){
	
	var confirmPopup = $ionicPopup.confirm({
			 title: 'Are You To Accpt '+x.slNo+'?',
			// template: 'Log out now?'
		   });
		   confirmPopup.then(function(res) {               
			 if(res) {
			 	$ionicLoading.show({
                template: 'Please Wait..'
            });
				
						 $http({
									  method: 'POST',
									  
									  url:  $rootScope.getServerIp+'AimsAppsConnectivity/UserAccptanceExecution',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID,orderDate:x.order_date,DocID:x.Order_no},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										
											if(data.userAcceptanceExecutionNodes[0].out_code == 0) {
											//Begin list
											$scope.clientUserAccptList="";
											
											$http({
						  method: 'POST',
									  
							url:  $rootScope.getServerIp+'AimsAppsConnectivity/UserAccptanceDetailTagCodceSV',
									  params: {mailID:'admin@rrm.com',sessionID:$rootScope.sessionID,userID:$rootScope.userID,fromDate:$scope.f_fromdate ,toDate:$scope.f_todate},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {
										if(data.userAcceptanceDetailsCodeNodes[0].out_code == 0) {
										
											$scope.clientUserAccptList="";
											
												
												//Begin list
												 $http({
											  method: 'POST',
											  
											  url:  $rootScope.getServerIp+'AimsAppsConnectivity/UserAceptanceSV',
											  params: {sessionID:$rootScope.sessionID,userID:$rootScope.userID},
											  //type:'JSON',
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
															
													
													$scope.clientUserAccptList=data;
													$ionicLoading.hide();
													
													
													
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												$ionicLoading.hide();
												$ionicPopup.alert({
												 title:'Unable to perform your request. Please Check your Device Internet Connection',
																			  //template:'From date'
												})
											}); 
										//end list
										
										}else{
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:data.userAcceptanceDetailsCodeNodes[0].out_message,
																	 
										})
										}
											
											
										
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
												//end list
										
											}
											else {
												$ionicLoading.hide();
														
														$ionicPopup.alert({
													 title:data.userAcceptanceExecutionNodes[0].out_message,
																				  //template:'From date'
													})
											}
											//Show list
											
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
										$ionicLoading.hide();
										$ionicPopup.alert({
										 title:'Unable to perform your request. Please Check your Device Internet Connection',
																	  //template:'From date'
										})
									}); 
			 
			 } else {
			   //console.log('You are not sure');
			 }
		   });
		   
		   	  $timeout(function() {
					 $ionicLoading.hide();
				   }, 10000);
	}

})