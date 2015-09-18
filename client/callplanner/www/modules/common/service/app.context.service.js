angular.module('callplanner.common')
.factory('AppContext', function(DBHandlerService) {
  
  var myNumber = "";
  var emailAddress = "";
  var emailPassword = "";
  var enableSync = false;
  var alias = "";
  console.log("here");

  return { 

    init: function() {
      DBHandlerService.getConfiguration().then(
        function(data) {
          console.log("appcontext.init : " + data);

          myNumber = data.myNumber;
          emailAddress = data.emailAddress;
          emailPassword = data.emailPassword;
          enableSync = data.enableSync;
          alias = data.alias;
        },
        function(err) {
          
        }
      );
      return;
    },
    getSyncEnabled: function() {
      return enableSync;
    },
    setSyncEnabled: function(enable) {
      DBHandlerService.setConfiguration("enableSync", enable);
      enableSync = enable;
    },
    getMyNumber: function() {
      return myNumber;
    },
    setMyNumber: function(number) {
      DBHandlerService.setConfiguration("myNumber", number);
      myNumber = number;
    },
    getAlias: function() {
      console.log("get alias : " + alias);
      return alias;
    },
    setAlias: function(_alias) {
      DBHandlerService.setConfiguration("alias", _alias);
      alias = _alias;
    },
    getEmailPassword: function() {
      return emailPassword;
    }, 
    setEmailPassword: function(_emailPass) {
      DBHandlerService.setConfiguration("emailPassword", _emailPass);
      emailPassword = _emailPass;
    },
    getEmailAddress: function() {
      return emailAddress;
    },
    setEmailAddress: function(_emailAddr) {
      DBHandlerService.setConfiguration("emailAddress", _emailAddr);
      emailAddress = _emailAddr;
    }
  }
});