module.exports = function(Attendee) {

  // get planList
  Attendee.attendeeStatus = function(data, cb) {

    Attendee.updateAll({planId: data.attendants.planId,tel: data.attendants.tel},data.attendants,function(err,info){

      if(err) return cb(err);

      cb(null);
    });
  }

  Attendee.remoteMethod(
    'attendeeStatus',
    {
      accepts: { arg: 'attendants', type: 'object', http:{source: 'body'}},
      http: {path: '/attendeeStatus', verb: 'put', status: '200', errorStatus:'400'}
    }

  );

};
