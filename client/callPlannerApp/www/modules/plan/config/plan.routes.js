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
        templateUrl: 'modules/plan/views/tabs.html'
      })
      .state('app.plan.planlist',{
        url: '/planlist',
        views: {
          'planlist-tab' : {
            controller: 'PlanListCtrl',
            templateUrl: 'modules/plan/views/planList.html'
          }
        }
      })
      .state('app.plan.detail',{
        url: '/planDetail',
        views: {
          'planlist-tab' : {
            controller: 'PlanDetailCtrl',
            templateUrl: 'modules/plan/views/planDetail.html'
          }
        }
      })
      .state('app.plan.contacts',{
        url: '/contacts',
        views: {
          'planlist-tab' : {
            controller: 'ContactsCtrl',
            templateUrl: 'modules/plan/views/contacts.html'
          }
        }
      })
      .state('app.plan.form',{
        url: '/form',
        views: {
          'planlist-tab' : {
            controller: 'createPlanCtrl',
            templateUrl: 'modules/plan/views/createPlan.html'
          }
        }
      })
      .state('app.plan.greeting',{
        url: '/form',
        views: {
          'planlist-tab' : {
            controller: 'GreetingCtrl',
            templateUrl: 'modules/plan/views/greeting.html'
          }
        }
      })
      .state('app.plan.history',{
        url: '/history',
        views: {
          'history-tab' : {
            controller: 'HistoryCtrl',
            templateUrl: 'modules/plan/views/history.html'
          }
        }

      })
  });
