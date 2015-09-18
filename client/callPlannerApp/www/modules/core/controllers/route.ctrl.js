/**
 *
 * Created by kimjin-young on 2015. 7. 23..
 */
'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:RouteCtrl
 * @description Redirect for acess
 * @requires $q
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires AppAuth
 **/
angular.module('com.module.core')
  .controller('RouteCtrl', function($q, $scope, $state, $location, LoopBackAuth) {
    console.log(LoopBackAuth.currentUserId);

    if (!LoopBackAuth.currentUserData) {
      console.log('Redirect to login');
      $location.path('/intro');
    } else {
      console.log('Redirect to app');
      $location.path('/app');
    }
  });
