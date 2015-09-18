angular.module('callplanner.common')
.controller('HomeCtrl', function($scope, $state, $rootScope) {
	// $ionicPush, $ionicUser

	// $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
 //    console.log('Got token' + data.token + "  " + data.platform);
 //  });
 //  //Basic registration
 //  $scope.pushRegister = function() {
 //    alert('Registering...');

 //    $ionicPush.register({
 //      canShowAlert: false,
 //      onNotification: function(notification) {
 //        // Called for each notification for custom handling
 //        console.log("last notification : " + JSON.stringify(notification));
 //        $scope.lastNotification = JSON.stringify(notification);
 //      }
 //    }).then(function(deviceToken) {
 //      $scope.token = deviceToken;
 //    });
 //  }
 //  $scope.identifyUser = function() {
 //    alert('Identifying');
 //    console.log('Identifying user');

 //    var user = $ionicUser.get();
 //    if(!user.user_id) {
 //      // Set your user_id here, or generate a random one
 //      user.user_id = $ionicUser.generateGUID()
 //    };

 //    angular.extend(user, {
 //      name: 'Test User',
 //      message: 'I come from planet Ion'
 //    });

 //    $ionicUser.identify(user);

 //  }

 //  $scope.identifyUser();
 //  $scope.pushRegister();
});




// curl -u 2cbf479c515e52edce4a2a6f94868f1989f1261d2ced01b5: -H "Content-Type: application/json" -H "X-Ionic-Application-Id: dd0207b350b746622233d766ec15e694" https://push.ionic.io/api/v1/push -d '{"tokens":["DEV-a1282f95-7cba-40de-a9b9-06dfab650109"],"notification":{"alert":"I come from planet Ion."}}'