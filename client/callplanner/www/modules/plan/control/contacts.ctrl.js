angular.module('callplanner.plan')
.controller('ContactsCtrl', function($scope, $state, $ionicPopup, $ionicModal, $ionicHistory, Contacts) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.contacts = [];

  $scope.goBack = function() {
    Contacts.revert();
    $ionicHistory.goBack();
  }
  $scope.contacts = Contacts.getForEdit();
  $scope.submit = function() {
    // console.log('Submit!');
    Contacts.apply();
    $ionicHistory.goBack();
  };
  
  $scope.showManualInputPopup = function() {
    $scope.num = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="num.number">',
      title: 'Input Phone Number',
      subTitle: 'ex) 01012345678',
      scope: $scope,
      buttons: [
       { text: 'Cancel' },
       {
         text: 'Add',
         type: 'button-positive',
         onTap: function(e) {
          if ($scope.num.number == '') {
            console.log('test');
            e.preventDefault();
          } else {
            var z1 = /^[0-9]*$/;
            if (z1.test($scope.num.number))
              return $scope.num.number;
            else return '';
          }
        } 
      }
      ]
   });
   myPopup.then(function(res) {
    console.log('res:' + res);
    if(res != undefined && res != '') {
      $scope.contacts.push({
        name: res,
        role: "member",
        tel: res,
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
        checked: true,
        fromContacts: false
      });
    }
   });
  };
  
  $scope.contactPrefilter = function(contactList) {
    // console.log("contactList.size:" + contactList.length);
    if(contactList == undefined)
      return;
    var result = [];
    for(var i=0 ; i<contactList.length ; i++) {
      if(contactList[i].fromContacts)
        result.push(contactList[i]);
    }
    // console.log("resullt.size:" + result.length);
    return result;
  }

  $scope.numberPrefilter = function(contactList) {
    
    if(contactList == undefined)
      return;
    var result = [];
    for(var i=0 ; i<contactList.length ; i++) {
      if(!contactList[i].fromContacts && contactList[i].checked)
        result.push(contactList[i]);
    }
    return result;
  }

  $scope.removeNumber = function(tel) {
    // console.log("Unchecked clicked number " + tel);
    Contacts.uncheckFromTemp(tel);
    // $scope.plan.attendees.splice($index,1);
  };

});