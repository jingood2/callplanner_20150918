/**
 * Created by kimjin-young on 2015. 7. 20..
 */
angular.module('app.controllers', [])
  .controller('TourCtrl', function($scope, $ionicModal, $timeout,$routeParams,$location,$filter,Subscriber,AppAuth) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var TWO_WEEKS = 1000 * 60 *60 * 24 * 7 *2;

    $scope.credentials = {
      ttl: TWO_WEEKS,
      rememberMe :  true
    };

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('./views/tour/modal-login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.showLogin = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };

    $scope.$on('$destroy', function(){
      $scope.modal.remove();
    });

    // Form data for the signup modal
    $scope.registration = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tel: ''
    };

    $scope.confirmPassword = '';

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('./views/tour/modal-signup.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeSignup = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.showSignup = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing register', $scope.registration);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeSignup();
      }, 1000);
    };


    $scope.register = function() {

      $scope.registration.username = $scope.registration.email;
      $scope.subscriber = Subscriber.save($scope, registration,

        function() {

          $scope.loginResult = Subscriber.login({
              include: 'subscriber',
              rememberMe: true
          }, $scope.registration, function() {

              // login success
              AppAuth.currentUser = $scope.loginResult.user;
              $location.path('/');

          },
          function(res){
            // login failed
            $scope.loginError = res.data.error;
          });
      },
      function(res){

        // Error to save Subscriber callback
        $scope.registerError = res.data.error;

      }); // save
    };
});
