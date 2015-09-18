/**
 *
 * Created by kimjin-young on 2015. 7. 30..
 */

angular.module('com.module.core',['ionic'])
  .factory("popupService",function($ionicPopup){

    return {
      showPopup: showPopup
    };

    function showPopup(scope) {

      return $ionicPopup.confirm({
          title: scope.plan.title,
          templateUrl: 'templates/popup.html',
          scope: scope,
          cancelText: 'Cancel',
          cancelType: 'button-assertive',
          okText: 'Ok',
          okType: 'button-positive'
      }).then(function(res){
        if(res) {
          console.log('OK');
          scope.createPlan();
        } else {
          console.log('Cancel')
        }
      });
    }
  });
