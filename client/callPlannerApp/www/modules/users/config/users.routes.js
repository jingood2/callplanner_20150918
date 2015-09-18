/**
 *
 * Created by kimjin-young on 2015. 7. 24..
 */

'use strict';
angular.module('com.module.users')
  .config(function($stateProvider){
    $stateProvider
    .state('intro',{
      url: '/intro',
      templateUrl: 'modules/users/views/intro.html',
      controller: 'IntroCtrl'
    });
  });
