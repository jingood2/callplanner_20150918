/**
 *
 * Created by kimjin-young on 2015. 7. 21..
 */

angular.module('com.module.users')
.controller('IntroCtrl',function($scope, $ionicModal){

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('modules/users/views/modal-login.html', {

      id: '1',      // We need to use and ID to identify the modal that is firing the event
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    $ionicModal.fromTemplateUrl('modules/users/views/modal-signup.html', {

      id: '2',      // We need to use and ID to identify the modal that is firing the event
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });


    // Triggered in the login modal to close it
    $scope.closeModal = function(index) {
      if(index == 1) $scope.oModal1.hide();
      else
        $scope.oModal2.hide();
    };

    $scope.hideAll = function() {
      $scope.oModal1.hide();
      $scope.oModal2.hide();
    }

    // Open the login modal
    $scope.showModal = function(index) {
      if(index == 1) $scope.oModal1.show();
      else
        $scope.oModal2.show();
    };

    $scope.$on('$destroy', function(){
      console.log('Destroying modals.....');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });

    $scope.$on('modal.shown', function(event, modal){

    });

    $scope.$on('modal.hidden', function(event, modal){

    });

});

