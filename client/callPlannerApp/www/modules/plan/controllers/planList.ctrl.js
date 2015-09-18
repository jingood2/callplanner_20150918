'use strict';

angular.module('com.module.plan')

  .controller('PlanListCtrl',function($rootScope,$timeout, $scope,$state,$location,$stateParams,Plan,Subscriber,LoopBackAuth,ionicMaterialMotion,ionicMaterialInk){

    console.log('[PlanCtrl]CurrentState:' + $state.current.name);

    $scope.planArray = [];

    $scope.listPlans = function() {

      Plan.listPlans(

      function(res){

        res.listPlans.forEach(function(plan){
          console.log(plan);
          $scope.planArray.push(plan);
        });
      },function(err){

      });

    }();

    //$scope.listPlans();

    /*
    $rootScope.showHeader();
    $rootScope.clearFabs();
    $rootScope.isExpanded = true;
    $rootScope.setExpanded(true);
    $rootScope.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 100);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    */

  });
