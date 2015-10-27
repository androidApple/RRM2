// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova','base64'])





.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
.state('app', {
      url: "/app",	  
      abstract: true,
      templateUrl: "templates/sidemenu.html",
      controller: 'AppCtrl'
    })
	
 .state('app.welcome', {
      url: "/welcome",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/welcome.html",
          controller: 'welcomeCtrl'
        }
      }
    })
	
	.state('app.clientWelcome', {
      url: "/clientWelcome",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/clientWelcome.html",
          controller: 'clientWelcomeCtrl'
        }
      }
    })
 
 
 .state('app.clientPurchaseOrder', {
      url: "/clientPurchaseOrder",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/clientPurchaseOrder.html",
		    controller: 'clientPurchaseOrderCtrl'
        }
      }
    })
	
	.state('app.clientPurchaseOrderStatus', {
      url: "/clientPurchaseOrderStatus",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/clientPurchaseOrderStatus.html",
		    controller: 'clientPurchaseOrderStatusCtrl'
        }
      }
    })
	
	.state('app.clientPurchaseOrderStatusDetails', {
      url: "/clientPurchaseOrderStatusDetails",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/clientPurchaseOrderStatusDetails.html",
		    controller: 'clientPurchaseOrderStatusDetailsCtrl'
        }
      }
    })
	
	.state('app.clientViewStatement', {
      url: "/clientViewStatement",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/clientViewStatement.html",
		    controller: 'clientViewStatementCtrl'
        }
      }
    })
	
	.state('app.userAcceptAction', {
      url: "/userAcceptAction",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/userAcceptAction.html",
		    controller: 'userAcceptActionCtrl'
        }
      }
    })
	
	
	
	
		.state('app.adminPurchaseOrder', {
      url: "/adminPurchaseOrder",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/adminPurchaseOrder.html",
		    controller: 'adminPurchaseOrderCtrl'
        }
      }
    })
 
 	.state('app.allPartyLedger', {
      url: "/allPartyLedger",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/allPartyLedger.html",
		    controller: 'allPartyLedgerCtrl'
        }
      }
    })
	
	
  	.state('app.singleParty', {
      url: "/singleParty",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/singleParty.html",
		    controller: 'singlePartyCtrl'
        }
      }
    })
	
		.state('app.lcParty', {
      url: "/lcParty",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/lcParty.html",
		    controller: 'lcPartyCtrl'
        }
      }
    })
		.state('app.cashPaymentDeptwise', {
      url: "/cashPaymentDeptwise",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/cashPaymentDeptwise.html",
		    controller: 'cashPaymentDeptwiseCtrl'
        }
      }
    })
	
	
	.state('app.allCustomerLedger', {
      url: "/allCustomerLedger",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/allCustomerLedger.html",
		    controller: 'allCustomerLedgerCtrl'
        }
      }
    })
	
	.state('app.singleCustomer', {
      url: "/singleCustomer",
	 
      views: {
        'menuContent' :{
          templateUrl: "templates/singleCustomer.html",
		    controller: 'singleCustomerCtrl'
        }
      }
    })
	
	
	
	.state('app.cashAmountList', {
      url: "/cashAmountList",
	  
      views: {
        'menuContent' :{
          templateUrl: "templates/cashAmountList.html",
		    controller: 'cashAmountListCtrl'
        }
      }
    })
	
		.state('app.cashPaymentGroupWise', {
      url: "/cashPaymentGroupWise",
	  
      views: {
        'menuContent' :{
          templateUrl: "templates/cashPaymentGroupWise.html",
		    controller: 'cashPaymentGroupWiseCtrl'
        }
      }
    })
  
  
  
  
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
	   controller: 'TabsCtrl'
    })
	
    .state('tabs.signin', {
      url: "/signin",
      views: {
        'signin-tab': {
          templateUrl: "templates/signin.html",
          controller: 'SignInCtrl'
        }
      }
    })

    .state('tabs.locations', {
      url: "/locations",
      views: {
        'locations-tab': {
          templateUrl: "templates/locations.html",
		  controller: 'LocationsCtrl'
        }
      }
    })

	   .state('tabs.services', {
      url: "/services",
      views: {
        'services-tab': {
          templateUrl: "templates/services.html",
		  controller: 'ServicesCtrl'
        }
      }
    })
	
	
	   .state('tabs.registration', {
      url: "/registration",
      views: {
        'registration-tab': {
          templateUrl: "templates/registration.html",
		  controller: 'registrationCtrl'
        }
      }
    })
	
  // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise("/tab/signin");

});
