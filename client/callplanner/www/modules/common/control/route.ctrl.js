angular.module('callplanner.common')
.controller('RouteCtrl', function($scope, $state, $location, LoopBackAuth) {
  if (!LoopBackAuth.currentUserData) {
    $location.path('/login');
  } else {
    $location.path('/tab/home');
    $state.go('tab.home');
  }

    // $location.path('/tab/home');
});