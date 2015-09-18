/**
 * Created by kimjin-young on 2015. 7. 29..
 */
'use strict';

angular.module('com.module.plan')
  .controller('CreatePlanCtrl',function($rootScope,$timeout,$scope,$state,$location,$stateParams,Plan,LoopBackAuth,popupService){

    $scope.myCol = [{
      name: 'Some Title',
      email: 'test@text.com',
      list: [{email: 'test_two@text.com', url: 'img/arya.jpg'}]
    },{
      name: 'Another Title',
      list: [{email: 'test@text.com', url: 'img/sansa.jpg'}]
    }];

    $scope.test2 = [{
      thumbnailUrl: 'img/sansa-snowcastle.png',
      title: 'Some Title',
      subtitle: 'test@text.com'
    }];

    $scope.returnedValues = [];

    $scope.currentDate = new Date();

    $scope.datePickerCallback = function (val) {
      if(typeof(val)==='undefined'){
        console.log('Date not selected');
      }else{
        console.log('Selected date is : ', val);
      }
    };

    $scope.chips = function() {

      console.log("chips!!!");
    }


    $scope.plan = {
      "callType": "time",
      "ment": {
        "container": LoopBackAuth.currentUserData.tel,
        "file": "default.wav"
      },
      "scheduledAt": "",
      "repeat": "once",
      "title": "",
      "enabled": true,
      "callState": "Disconnected",
      "attendees": [
        "object"
      ],
      "record": "false"
    };


    $scope.createPlan = function(){
      Plan.create(
          $scope.plan,
          function(res) {

            console.log(res);
            $state.go('app.plan.planList');

          },
          function(res){
            console.log(res);
            $scope.loginError = res.data.error;
          }
      );
    };

    $scope.showConfirmPlan = function() {
      popupService.showPopup($scope);
    };



});
