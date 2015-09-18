angular.module('callplanner.plan')
.controller('PreviousAnnounceCtrl', function($rootScope, $scope, $ionicHistory, $stateParams, $state, $ionicPopup, Plan, LoopBackAuth, Subscriber, Contacts) {

  $scope.files = [{title:"Weekly Meeting", time: "2015-03-01 13:00:01"},{title:"Daily", time: "2015-03-01 13:00:01"}, {title:"Conference call", time: "2015-03-01 13:00:01"}];

  $scope.goBack = function() {
    // console.log("my goback");
    // Contacts.revert();
    $ionicHistory.goBack();
  }
  $scope.selectPreviousAnnounce = function() {
    console.log("selectPreviousAnnounce clicked");
    $ionicHistory.goBack();
  };

  return;
});
