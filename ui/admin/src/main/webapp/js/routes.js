angular.module("app",['ui.router'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })
    
     .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html'
    })
    
    .state('product', {
      url: '/product',
      templateUrl: 'templates/product.html'
    })
    
    .state('sales', {
      url: '/sales',
      templateUrl: 'templates/sales.html'
    })
    
     .state('classMasterDefinition', {
      url: '/classMasterDefinition',
      templateUrl: 'templates/classMasterDefinition.html'
    })
    
    .state('schoolSetup', {
      url: '/schoolSetup',
      templateUrl: 'templates/schoolSetup.html'
    })
    
    .state('academicYear', {
      url: '/academicYear',
      templateUrl: 'templates/academicYear.html'
    })
    
    .state('subjectDefn', {
      url: '/subjectDefn',
      templateUrl: 'templates/subjectDefn.html'
    })
    
    .state('hoildayCalendar', {
      url: '/hoildayCalendar',
      templateUrl: 'templates/holidayCalendar.html'
    })
    
     .state('schoolSessionDefn', {
      url: '/schoolSessionDefn',
      templateUrl: 'templates/schoolSessionDefn.html'
    })
    
     .state('manageClass', {
      url: '/manageClass',
      templateUrl: 'templates/manageClass.html'
    })
    
    .state('studentMgmt', {
      url: '/studentMgmt',
      templateUrl: 'templates/studentMgmt.html'
    })
    
     .state('promotion', {
      url: '/promotion',
      templateUrl: 'templates/promotion.html'
    })
    
    .state('birthdayList', {
      url: '/birthdayList',
      templateUrl: 'templates/birthdayList.html'
    })
    
     .state('promotionReport', {
      url: '/promotionReport',
      templateUrl: 'templates/promotionReport.html'
    })
    
    
     .state('feeTypeMaster', {
      url: '/feeTypeMaster',
      templateUrl: 'templates/feeTypeMaster.html'
    })
    
    .state('studentFeeDefinition', {
      url: '/studentFeeDefinition',
      templateUrl: 'templates/studentFeeDefinition.html'
    })
    
    .state('feeCollect', {
      url: '/feeCollect',
      templateUrl: 'templates/feeCollect.html'
    })
    
    .state('studentFeeDueList', {
      url: '/studentFeeDueList',
      templateUrl: 'templates/studentFeeDueList.html'
    })
    
    .state('viewfeeCollection', {
      url: '/viewfeeCollection',
      templateUrl: 'templates/viewfeeCollection.html'
    })
    
     .state('smsTemplate', {
      url: '/smsTemplate',
      templateUrl: 'templates/smsTemplate.html'
    })
    
     .state('studentSms', {
      url: '/studentSms',
      templateUrl: 'templates/studentSms.html'
    })
    
     .state('deliveryReport', {
      url: '/deliveryReport',
      templateUrl: 'templates/deliveryReport.html'
    })
    
    .state('smsByMobileNo', {
      url: '/smsByMobileNo',
      templateUrl: 'templates/smsByMobileNo.html'
    })
    
    .state('markAttendance', {
      url: '/markAttendance',
      templateUrl: 'templates/markAttendance.html'
    })
    
    
    
    
    

  
$urlRouterProvider.otherwise('/login')

});
