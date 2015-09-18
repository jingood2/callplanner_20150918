angular.module('callplanner.user')
.controller('LoginCtrl',function($rootScope, $scope, $ionicPlatform, $ionicModal, Subscriber, LoopBackAuth, $location, DBHandlerService, AppContext){

    //   console.log("onDatabaseReady");
    //   DBHandlerService.addPlan({
    //     id: '1',
    //     title:'test1'
    //   });
    //   DBHandlerService.addPlan({
    //     id: '2',
    //     title:'test2'
    //   });
    //   DBHandlerService.addPlan({
    //     id: '3',
    //     title:'test3'
    //   });

    //   DBHandlerService.addPlan({
    //     id: '4',
    //     title:'test4'
    //   }).then(function() {
    //     console.log("success to insert plan");
    //     DBHandlerService.getPlanList().then(
    //       function(res) {
    //         console.log("getPlanList() : " + JSON.stringify(res));

    //         // res.rows.forEach(function(row){
    //         //   console.log("Row["+"]" + JSON.stringify(plan));
    //         //   $scope.planArray.push(plan);
    //         // });
    //         for(var i=0 ; i<res.rows.length ; i++) {
    //           console.log("item["+i+"] id:" + res.rows.item(i)['id'] + ", title:"+res.rows.item(i)['title']);
    //         };

    //       },
    //       function(err) {
    //         console.log("err getPlanList() : " + JSON.stringify(err));
    //       });
    //   }, function() {

    //   });

    // });
  // $ionicPlatform.registerBackButtonAction(function(e){
  //   ionic.Platform.exitApp();
  // },101);

  $ionicModal.fromTemplateUrl('modules/user/view/modal-signup.html', {

    id: '2',      
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal2 = modal;
  });

  $scope.closeModal = function(index) {
    if(index == 1) $scope.oModal1.hide();
    else
      $scope.oModal2.hide();
  };

  $scope.hideAll = function() {
    $scope.oModal2.hide();
  }

  $scope.showModal = function(index) {
    if(index == 1) $scope.oModal1.show();
    else
      $scope.oModal2.show();
  };

  $scope.$on('$destroy', function(){
    console.log('Destroying modals.....');
    // $scope.oModal1.remove();
    $scope.oModal2.remove();
  });

  $scope.$on('modal.shown', function(event, modal){

  });

  $scope.$on('modal.hidden', function(event, modal){

  });

  var TWO_WEEKS = 1000 * 60 *60 * 24 * 7 *2;

  $scope.credentials = {
    ttl: TWO_WEEKS,
    rememberMe :  true
  };

  $scope.call = function(p_num) {
    window.open('tel:'+p_num, '_system', 'location=yes');
  };


  $scope.login = function() {
    console.log("Trying to login");
    Subscriber.login({
      include: 'user',
      rememberMe: $scope.credentials.rememberMe
    },$scope.credentials,function(res){
      console.log("Success to login - " + JSON.stringify(res));
      AppContext.setMyNumber(LoopBackAuth.currentUserData.tel);
      var next = $location.nextAfterLogin || '/';
      $location.nextAfterLogin = null;

      if(next === '/login') {
        next = '/';
      }

     $scope.hideAll();

     $location.path('/tab/home');

    },function(res){

      console.log("Error on login - " + JSON.stringify(res));

    });

  };

});