angular.module('callplanner.plan')
.controller('PlansCtrl', function($ionicPlatform, $rootScope,$scope, $state,$http, $timeout, LoopBackAuth, Plan, Subscriber, DateUtil) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // $scope.plans = Plans.all();

  // $ionicPlatform.registerBackButtonAction(function(e){
  //   ionic.Platform.exitApp();
  // },101);

  $scope.planArray = [];

  var successFunc = function() {
    console.log("success");
  };

  var failureFunc = function() {
    console.log("failure");
  };

  var listPlans = function() {
    $scope.planArray = [];
    Plan.listPlans(

      function(res){
        res.listPlans.forEach(function(plan){
          console.log("Plan : " + JSON.stringify(plan));
          console.log("date : " + typeof(plan.plan.scheduledAt));
          $scope.planArray.push(plan);
        });
      },function(err){
        console.log("Error on listPlans - " + JSON.stringify(err));
      }
    );

  };
  listPlans();

  $scope.remove = function(plan) {


    console.log("planId to be deleted : " + plan.planId);

    Plan.deleteById(
      {id:plan.planId},
      function(res){
        $rootScope.$emit('refresh-plan-list', [3000]);
        console.log("emitted");
        console.log("1res:" + JSON.stringify(res));
      },
      function(err){
        console.log("error on delete Plans - " + JSON.stringify(err));
        console.error("1err:" + err);
        // console.log("Auth:" + LoopBackAuth.currentUserId);    
      }
    );
    // console.log("delete request : " + 'http://192.168.4.29:4000/api/v2/Plans/' + plan.planId + '?access_token=' + LoopBackAuth.accessTokenId);

    // $http.delete('http://192.168.4.29:4000/api/v2/Plans/' + plan.planId + '?access_token=' + LoopBackAuth.accessTokenId)
    //         .success(function (data, status, headers) {
    //           console.log('success : ' + JSON.stringify(data));
    //           console.log('success : ' + JSON.stringify(status));
    //           console.log('success : ' + JSON.stringify(headers));
    //           $rootScope.$emit('refresh-plan-list',[]);
    //             // $scope.ServerResponse = data;
    //         })
    //         .error(function (data, status, header, config) {
    //             console.log('err : ' + JSON.stringify(data));
    //             console.log('err : ' + JSON.stringify(status));
    //             console.log('err : ' + JSON.stringify(header));
    //             console.log('err : ' + JSON.stringify(config));
    //             $rootScope.$emit('refresh-plan-list',[]);
    //         });
  }

  $scope.doRefresh = function() { 
    // $scope.todos.unshift({name: 'Incoming todo ' + Date.now()})

    $timeout(function() {
      console.log("timeout");
      listPlans();
    }, 500);
    
    $scope.$broadcast('scroll.refreshComplete');

  };

  $rootScope.$on('refresh-plan-list', function(event, args) {
    console.log("refresher called");
    $scope.doRefresh();
  });

  $scope.parseImgUrl = function(repeat) {
    // console.log("repeat : " + repeat);
    
    switch (repeat) {
      case 'once' :  return 'img/once.png';
      case 'daily' : return 'img/day.png';
      case 'weekly' : return 'img/week.png';
      case 'monthly' : return 'img/month.png';
      default : return 'img/once.png';
    }
  }
  $scope.getDateStr = function(str) {
    // console.log(typeof(str));
    // console.log(str);
    // console.log(new Date(str));
    // console.log("date.fromISOstring : " + DateUtil.fromISOString(str));
    // return DateUtil.fromISOString(str);
    return new Date(str.replace('T',' ') + 'GMT').toString();
    // return DateUtil.fromISOString(str);
  }

  $scope.parseAttendees = function(attendees) {
    var attendants ='';
    // console.log('attendee length: ' + attendees.length);
    for(var i=0 ; i<attendees.length ; i++) {
      // console.log("attendee[i] : " + attendees[i].tel);
      if(i>0)
        attendants = attendants.concat("," + attendees[i].tel);
      else
        attendants = attendants.concat(attendees[i].tel);
      // console.log("attendants:" + attendants);
    }
    // console.log("total attendants : " + attendants);
    return attendants;
  };

});