angular.module('callplanner.setting')
.factory('ExchangeAccountService', function($http, $rootScope, AppContext, Subscriber, LoopBackAuth, $q) {
  return {
  	update: function(userId_, addr_, pwd_) {
      var deferred = $q.defer();
      var data = {
        exchangeEmail: addr_,
        exchangePassword: pwd_,
      };
      
      $http.put('http://192.168.4.29:4000/api/v2/Subscribers/' + userId_ + '?access_token=' + LoopBackAuth.accessTokenId, data)
            .success(function (data, status, headers) {
              deferred.resolve("success");
              console.log('success : ' + JSON.stringify(data));
              console.log('success : ' + JSON.stringify(status));
              console.log('success : ' + JSON.stringify(headers));

                // $scope.ServerResponse = data;
            })
            .error(function (data, status, header, config) {
                console.log('err : ' + JSON.stringify(data));
                console.log('err : ' + JSON.stringify(status));
                console.log('err : ' + JSON.stringify(header));
                console.log('err : ' + JSON.stringify(config));
                deferred.reject("fail");
            });

  		return deferred.promise;
  	}
    
  };
})