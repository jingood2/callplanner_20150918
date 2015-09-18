// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'callplanner' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'callplanner.services' is found in services.js
// 'callplanner.controllers' is found in controllers.js
angular.module('callplanner', [
  'ionic',
  'config',
  'ui.router',
  'ngCordova',
  'ngResource',
  'initializer',
  'lbServices',
  'callplanner.common',
  'callplanner.user',
  'callplanner.plan',
  'callplanner.setting',
  'ionic-datepicker',
  'ionic-timepicker'
  ])

<<<<<<< HEAD
.run(function($ionicPlatform, $cordovaSQLite, DBHandlerService, $http) {

  // {{$ionicPlatform}}
=======
.run(function($ionicPlatform, $cordovaSQLite,$rootScope) {

>>>>>>> bc06601a1286005a6f612bf015e899bbb3e74495
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
<<<<<<< HEAD
    // db = $cordovaSQLite.openDB("callplanner.db");
    // $cordovaSQLite.execute(db, 
    //     "CREATE TABLE IF NOT EXISTS Plans (id text primary key, title text, callState boolean, scheduledAt text, attendees text)")
    // .then(
    //   function(res){
    //     console.log("created by manually ");
    //   }, function(err) {

    //   })

    // $cordovaSQLite.execute(db, 
    //     "CREATE TABLE IF NOT EXISTS History (id text primary key, title text, callState boolean, scheduledAt text, attendees text)");
    // $cordovaSQLite.execute(db, 
    //     "CREATE TABLE IF NOT EXISTS Config (propname text, propval text)");
    // DBHandlerService.setDb(db);


            var data = {};
            var config={};
            $http.post('http://192.168.4.29:4004/api/installations', data, config)
            .success(function (data) {
                console.log("success to aaaa : " + JSON.stringify(data));
            })
            .error(function (data, status) {
                console.log("test to aaaa : " + JSON.stringify(data));
            });
=======

    // Setup SQLite
    if(window.cordova) {
      // App syntax
      db = $cordovaSQLite.openDB("callpalnner.db");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("callplanner.db", "1.0", "CallPlanner App DB", -1);
    }

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS myapp(id integer primary key, regId string)");

    // Push Notification
    var push = PushNotification.init({
      "android": {
        "senderID": "676639914279","icon": "phonegap", "iconColor": "blue"
      },
      "ios": {},
      "windows": {}
    });

    push.on('registration', function(data){

      // ToDo: need to save regid to SQLite for 3rd party push server added by jykim
      $rootScope.regId = data.registrationId;
      console.log(JSON.stringify(data));
    });

    push.on('notification', function(data){

      console.log("notification event!");

    });

    push.on('error',function(e) {
      console.log("push error");
    });

>>>>>>> bc06601a1286005a6f612bf015e899bbb3e74495

  });

  // $ionicPlatform.registerBackButtonAction(function (event) {
  //   console.log("OnDeviceReady");
  //                   event.preventDefault();
  //           }, 100);
  // var success = function(message) {
  //   console.log("Test");
  //       alert(message);

  //   };

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // , $ionicAppProvider

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
  .state('router',{
    url:'/router',
    controller: 'RouteCtrl'
  })

  .state('login',{
    url: '/login',
    templateUrl: 'modules/user/view/login.html',
    controller: 'LoginCtrl'
  })

  .state('settings', {
    url: "/settings",
    templateUrl: "modules/setting/view/settings.html",
    controller: "SettingsCtrl"
  })

  .state('createplan', {
    url: "/createplan",
    views: {
      '': {
        templateUrl: "modules/plan/view/createPlan.html",
        controller: "CreatePlanCtrl"
      }
    },
    params: {
      createtype: 'simple'
    }
  })

  .state('previousgreeting', {
    url: "/previousgreeting",
    templateUrl: "modules/plan/view/previous-greeting.html",
    controller: "PreviousGreetingCtrl"
  })

  .state('record', {
    url: "/record",
    templateUrl: "modules/plan/view/record.html",
    controller: "RecordCtrl"
  })

  .state('contacts', {
    url: "/contacts",
    templateUrl: "modules/plan/view/contacts.html",
    controller: "ContactsCtrl"
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "modules/common/view/tabs.html"
  })

  .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'modules/common/view/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
  .state('tab.plans', {
      url: '/plans',
      views: {
        'tab-plans': {
          templateUrl: 'modules/plan/view/plans.html',
          controller: 'PlansCtrl'
        }
      }
    })
  .state('tab.history', {
      url: '/history',
      views: {
        'tab-history': {
          templateUrl: 'modules/plan/view/history.html',
          controller: 'HistoryCtrl'
        }
      }
    })
  .state('tab.plan-detail', {
      url: '/plans/:plan',
      views: {
        'tab-plans': {
          templateUrl: 'modules/plan/view/plan-detail.html',
          controller: 'PlanDetailCtrl'
        }
      }
  })

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/home');

  $urlRouterProvider.otherwise('/router');

  // $ionicAppProvider.identify({
  //   // Your App ID
  //   app_id: 'dd0207b350b746622233d766ec15e694',
  //   // The public API key services will use for this app
  //   api_key: 'eb353ad21d7840769ddfbfdaf815a467b00e1e54a597c8bb',
  //   // Your GCM sender ID/project number (Uncomment if supporting Android)
  //   // gcm_id: '676639914279'
  // });

})

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


// .run(function($ionicPlatform, $cordovaPush) {

//   var androidConfig = {
//     "senderID": "676639914279"
//   };

//   var pushNotification = window.plugins.pushNotification;
//   console.log(pushNotification);
//   $ionicPlatform.ready(function(){
//     console.log("test");
//     $cordovaPush.register(androidConfig).then(function(result) {
//       console.log("success : " + JSON.stringify(result));
//     }, function(err) {
//       console.log("fail : " + JSON.stringify(err));
//     })

//     $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
//       switch(notification.event) {
//         case 'registered':
//           if (notification.regid.length > 0 ) {
//             alert('registration ID = ' + notification.regid);
//           }
//           break;

//         case 'message':
//           // this is the actual push notification. its format depends on the data model from the push server
//           alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
//           break;

//         case 'error':
//           alert('GCM error = ' + notification.msg);
//           break;

//         default:
//           alert('An unknown GCM event has occurred');
//           break;
//       }
//     });


//     // WARNING: dangerous to unregister (results in loss of tokenID)
//     // $cordovaPush.unregister(options).then(function(result) {
//       // Success!
//     // }, function(err) {
//       // Error
//     // })

//   });
// })
;
