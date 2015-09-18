'use strict';

angular.module('com.module.core')
  .run(function($rootScope){

    // left sidemenu
    $rootScope.menu = [];

    $rootScope.addMenu = function(name,uisref,icon) {
      $rootScope.menu.push({
        name:name,
        sref:uisref,
        icon:icon
      });
    }

    // Add Main menu
    $rootScope.addMenu('Home', 'app.home','ion-ios-home');

  });
