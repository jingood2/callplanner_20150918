angular.module('callplanner.common')
.factory('Exchange', function($rootScope, DBHandlerService, AppContext, $q) {
  return {
    create: function(data) {
      var deferred = $q.defer();
      var success = function(message) {
        console.log("normal response from exchange integration");
        // alert(message);
        deferred.resolve(message);
        $rootScope.$emit("SYNC_SUCC");
      };

      var failure = function(err) {
        console.log("abnormal response from exchange integration");
        // alert(err);
        deferred.reject(err);
        $rootScope.$emit("SYNC_FAIL");
      };
      
      data.exchangePassword = AppContext.getEmailPassword();
      data.exchangeEmail = AppContext.getEmailAddress();
      
      console.log("try to sync to exchange server");
      exchange.create(data, success, failure);
    
      return deferred.promise;
    }
  };
})