angular.module('callplanner.plan')
.controller('HistoryCtrl', function($ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function(e){
    ionic.Platform.exitApp();
  },101);
 });