'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:MainCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires CoreService
 * @requires AppAuth
 * @requires User
 * @requires gettextCatalog
 **/
angular.module('com.module.core')
  .controller('MainCtrl', function($scope, $rootScope,$location,$state,Subscriber,LoopBackAuth){


    $scope.currentUser = LoopBackAuth.currentUserData;
    console.log($scope.currentUser);

    $scope.menuoptions = $rootScope.menu;
    console.log($scope.menuoptions);

    console.log('[MainCtrl]CurrentState:' + $state.current.name);

    $scope.goContacts = function() {
      $state.go('app.plan.contacts');
    }

    $scope.goCreatePlan = function() {
      $state.go('app.plan.createPlan');
    }

    $scope.logout = function() {
      Subscriber.logout(function() {
        console.log('Start logout');
        $location.path('/intro');
        //$state.go('router');

        /*
        CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
          gettextCatalog.getString('You are logged out!'));
          */
      });
    };

  });
