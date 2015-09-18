'use strict';

angular.module('com.module.plan')
  .run(function($rootScope){


    // Add Plan menu
    $rootScope.addMenu('Plan', 'app.plan.planList','ion-android-calendar');

    $rootScope.isExpanded = false;
    $rootScope.hasHeaderFabLeft = false;
    $rootScope.hasHeaderFabRight = false;

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $rootScope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $rootScope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $rootScope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $rootScope.setExpanded = function(bool) {
        $rootScope.isExpanded = bool;
    };

    $rootScope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $rootScope.hasHeaderFabLeft = hasHeaderFabLeft;
        $rootScope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $rootScope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $rootScope.hideHeader = function() {
        $rootScope.hideNavBar();
        $rootScope.noHeader();
    };

    $rootScope.showHeader = function() {
        $rootScope.showNavBar();
        $rootScope.hasHeader();
    };

    $rootScope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

  });
