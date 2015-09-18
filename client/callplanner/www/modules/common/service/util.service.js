angular.module('callplanner.common')
.factory('DateUtil', function() {
  return {
    fromISOString: function(isoDateString) {
      var tzoffset = (new Date).getTimezoneOffset();
      console.log("isoDateString: " + isoDateString) ;
      function fastDateParse(y, m, d, h, i, s, ms){ // this -> tz
        return new Date(y, m - 1, d, h || 0, +(i || 0) - this, s || 0, ms || 0);
      }

      // result function
      // return function(isoDateString){
      var tz = isoDateString.substr(10).match(/([\-\+])(\d{1,2}):?(\d{1,2})?/) || 0;
      console.log("tz: " + tz);
      if (tz) {
        tz = tzoffset + (tz[1] == '-' ? -1 : 1) * (tz[3] != null ? +tz[2] * 60 + (+tz[3]) : +tz[2]);
        console.log("tz converted: " + tz);
      }
      console.log("after parsing : " + fastDateParse.apply(tz || 0, isoDateString.split(/\D/)));
      return fastDateParse.apply(tz || 0, isoDateString.split(/\D/));
      // }
    }
  }

});