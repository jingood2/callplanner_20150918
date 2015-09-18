/**
 *
 * Created by kimjin-young on 2015. 7. 23..
 */

'use strict';
angular.module('com.module.plan')
  .config(function($stateProvider){

    $stateProvider
      .state('app.plan',{
        abstract: true,
        url: '/plan',
        templateUrl: 'modules/plan/views/main.html'
      })
      .state('app.plan.planList',{
        url: '',
        templateUrl: 'modules/plan/views/planList.html',
        controller: 'PlanListCtrl'
      })
      .state('app.plan.contacts',{
        url: '/contacts',
        templateUrl: 'modules/plan/views/contacts.html'
      })
      .state('app.plan.createPlan',{
        url: '/createPlan',
        templateUrl: 'modules/plan/views/createPlan.html',
        controller: 'CreatePlanCtrl'
      });
  });
