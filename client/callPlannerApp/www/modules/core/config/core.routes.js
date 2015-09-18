/**
 *
 * Created by kimjin-young on 2015. 7. 23..
 */

'use strict';
angular.module('com.module.core')
  .config(function($stateProvider,$urlRouterProvider){

    $stateProvider
      .state('router',{
        url:'/router',
        controller: 'RouteCtrl'
      })
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'modules/core/views/app.html',
        controller: 'MainCtrl'
      })
      .state('app.home',{
        url: '',
        templateUrl: 'modules/core/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('app.contacts',{
        url: '/contacts',
        views: {
          'menuContent': {
            templateUrl: 'modules/plan/views/contacts.html'
          }

        }
      })
      .state('app.createPlan',{
        url: '/createPlan',
        views: {
          'menuContent': {
            templateUrl: 'modules/plan/views/createPlan.html'
          }

        }
      });

    $urlRouterProvider.otherwise('/router');
  });
