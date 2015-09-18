angular.module('callplanner.user')
.controller('SignupCtrl',function($scope,$location, $state,$filter, Subscriber, $location, AppContext){

    // Form data for the signup modal
    $scope.registration = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tel: ''
    };

    $scope.confirmPassword = '';
    // console.log(LoopBackAuth.currentUserId);
    // console.log(LoopBackAuth.currentUserData);


    $scope.signup = function() {

      Subscriber.create(
        $scope.registration,
        function(res) {
          AppContext.setMyNumber('$scope.registration.tel');
          console.log("Response for subscription: " + JSON.stringify(res));

          Subscriber.login({
            include: 'user',
            rememberMe: true
          },$scope.registration,
          function(res){

            console.log("Response for prelogin while subscribing : " + JSON.stringify(res));
            var next = $location.nextAfterLogin || '/';
            $location.nextAfterLogin = null;

            if(next === '/login') {
              next = '/';
            }

            // $scope.oModal1.hide();
            $scope.oModal2.hide();
            $state.go('tab.home');

          },
          function(res){
            console.log("Err Response for prelogin while subscribing : " + JSON.stringify(res));
            $scope.loginError = res.data.error;
          });
        },
        function(res){
          console.log("Error response for subscription: " + JSON.stringify(res));
          $scope.loginError = res.data.error;
        }
      );
    }

});