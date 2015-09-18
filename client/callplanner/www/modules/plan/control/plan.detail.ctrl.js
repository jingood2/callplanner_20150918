angular.module('callplanner.plan')
.controller('PlanDetailCtrl', function($scope, $state, $timeout, $ionicPlatform, $ionicHistory, $stateParams, LoopBackAuth, Plan, AppContext, Contacts) {

  $ionicPlatform.registerBackButtonAction(function(e){
    $ionicHistory.goBack();
  },101);

  console.log(JSON.stringify($scope.plan));
  var applyAttendeeList = function() {
    Contacts.clear();
    // console.log("loopbackauthdata : " + JSON.stringify(LoopBackAuth.currentUserData));
    for(var i=0 ; i<$scope.plan.plan.attendees.length ; i++) {
        if($scope.plan.plan.attendees[i].role == 'owner')
          continue;
        Contacts.check($scope.plan.plan.attendees[i].tel);
    }
    
  };

  var strToDate = function() {
    $scope.plan.plan.scheduledAt = new Date($scope.plan.plan.scheduledAt);
    $scope.plan.plan.scheduledTo = new Date(new Date($scope.plan.plan.scheduledAt).getTime() + 3600000);
  }

  var init = function() {

    $scope.plan = JSON.parse($stateParams.plan);
    // console.log("repeat : " + $scope.plan.plan.repeat);
    applyAttendeeList();
    strToDate();
    // console.log(typeof($scope.plan));
    $scope.tempScheduledAt = new Date($scope.plan.scheduledAt);

  }();

  var amIAttendee = function() {
    // $scope.isAttendee = true;
    if($scope.plan.tel == AppContext.getMyNumber())
      $scope.isAttendee = false;
    else
      $scope.isAttendee = true;
  }();

  var init = function() {
    $scope.contactList = Contacts.getAll();
    // console.log("initialized");
  };

  var strToDate = function(str) { 
    return new Date(str);
  };

  $scope.$on('$stateChangeSuccess', function () {
    init();
  });  
  // $scope.$watch('$viewContentLoaded', function() {
  //   console.log("initialized.");
  //   init();
  // });

  $scope.removeNumber = function(tel) {
    // console.log("Unchecked clicked number " + tel);
    // console.log("currently in contactList : " + JSON.stringify($scope.contactList));
    Contacts.uncheck(tel);
    // $scope.plan.attendees.splice($index,1);
  };

  $scope.prefilter = function(contactList) {
    var result = [];
    for(var i=0 ; i<contactList.length ; i++) {
      if(contactList[i].checked)
        result.push(contactList[i]);
    }
    return result;
  }

  $scope.group = 'advance';
  $scope.shownGroup = $stateParams.createtype;
  
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = 'simple';
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    // console.log("isGroupShown:shownGroup = " + $scope.shownGroup + ", group = " + group);
    return $scope.shownGroup == group;
  };
  var savedAnnouncePopup;
  $scope.showAnnounceMenu = function() {

   // An elaborate, custom popup
    var greetingPopup = $ionicPopup.show({
      templateUrl: 'templates/greeting-select.html',
      title: 'Announce',
      scope: $scope

    });
   greetingPopup.then(function(res) {
    console.log('res:' + JSON.stringify(res));
    // if(res != undefined && res != '') {
    //   $scope.contacts.push({
    //     name: res,
    //     role: "member",
    //     tel: res,
    //     face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
    //     checked: true,
    //     fromContacts: false
    //   });
    // }
   });
   savedAnnouncePopup = greetingPopup;
  };

  $scope.setAnnounce = function(data) {
    $scope.plan.ment.file = data.file;

    savedAnnouncePopup.close();
  };
  

  $scope.goBack = function() {
    Contacts.clear();
    $ionicHistory.goBack();
  };

  var validate = function() {
    if($scope.plan.title == '') {
      $scope.plan.title = "Conference Call";
    }
  };

  $scope.goPreviousAnnouncePage = function() {
    savedAnnouncePopup.close();
    $state.go('previousgreeting');
    // $location.path('/createplan/previousgreeting');
  };

  $scope.goRecordPage = function() {
    savedAnnouncePopup.close();
    $state.go('record');
    // $location.path('/createplan/record');
  };

  // $scope.getImgUrlFromStastus = function(isOn) {
  //   return isOn ? 'img/month.png' : 'img/month.png';
  // }
  var myStatus = "absent";

  var changeMyStatus = function() {
    if(myStatus == "absent")
      myStatus = "present";
    else
      myStatus = "absent";
  };

  $scope.myCallStatus = function() {
    return myStatus;
  };

  $scope.joinNow = function(number) {
    //implements callNow
    // console.log("Calling");

    window.open('tel:' + number, '_system');

    $timeout(function() {
      changeMyStatus()
    }, 1000);
  };

  $scope.muteStatus = "Muted";

  $scope.changeMuteStatus = function() {
    console.log("called mustStatus change");
    if($scope.muteStatus == "Muted")
      $scope.muteStatus = "Not Muted";
    else
      $scope.muteStatus = "Muted";
  };


  $scope.terminateCall = function() {
    $timeout(function() {
      changeMyStatus()
    }, 1000);

    console.log("Terminated call");
  };

  $scope.submit = function() {
    Contacts.clear();
    validate();

    for(var i=0 ; i<$scope.contactList.length ; i++) {
      if($scope.contactList[i].checked) {
        console.log("added attendant : " + $scope.contactList[i].name + " " + $scope.contactList[i].tel);
        $scope.plan.attendees.push(
          {
            "role": "member",
            "status": "absent",
            "name": $scope.contactList[i].name,
            "tel": $scope.contactList[i].tel
          }
        );
      }
    }

    console.log(JSON.stringify($scope.constactList));
    
    Plan.update(
      $scope.plan,
      function(res){
        console.log("update plan res:" + JSON.stringify(res));
      },
      function(err){
        console.log("error on update Plans - " + JSON.stringify(err));
        console.error(err);
        // console.log("Auth:" + LoopBackAuth.currentUserId);    
      }
    );
    $rootScope.$emit('refresh-plan-list', [1,2,3]);
    console.log("emitted");
    Contacts.clear();
    $state.go('tab.plans');

  }
})