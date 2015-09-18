/**
 * Created by kimjin-young on 2015. 7. 21..
 */

angular.module('com.module.users')
.controller('SignupCtrl',function($scope,$routeParams,$location, $state,$filter, Subscriber){

    // Form data for the signup modal
    $scope.registration = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tel: ''
    };

    $scope.confirmPassword = '';

    $scope.signup = function() {

      Subscriber.create(
        $scope.registration,
        function(res) {

          console.log(res);

          Subscriber.login({
            include: 'user',
            rememberMe: true
          },$scope.registration,
          function(res){

            var next = $location.nextAfterLogin || '/';
            $location.nextAfterLogin = null;

            if(next === '/intro') {
              next = '/';
            }

            $scope.oModal1.hide();
            $scope.oModal2.hide();
            $state.go('app.home');

          },
          function(res){
            $scope.loginError = res.data.error;
          });
        },
        function(res){
          console.log(res);
          $scope.loginError = res.data.error;
        }
      );
    }

});
