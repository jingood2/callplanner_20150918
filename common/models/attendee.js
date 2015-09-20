module.exports = function(Attendee) {

  // get planList
  Attendee.attendeeStatus = function(attendants, cb) {

    console.log('[Attendee] planId:' + JSON.stringify(attendants.planId) + 'tel: ' + JSON.stringify(attendants.tel));

    Attendee.updateAll({planId: attendants.planId,tel: attendants.tel},attendants,function(err,info){
      if(err)
        console.log(err);
      else {
        console.log('[Attendee] find info' + JSON.stringify(info));
      }
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

    Attendee.beforeRemote('create', function(ctx, attendee, next) {

      var req = ctx.req;


      if(ctx.req.accessToken) {
        attendee.removeAttribute(attendee.exchangeEmail);
        attendee.removeAttribute(attendee.exchangePassword);
        next();
      } else {
        next(new Error("must be logged in to create plan"));
      }

    });


    Attendee.beforeRemote('create', function(ctx, affectedModelInstance, next) {

        // is a member ?
        // has a exchange account ?

        var app = Attendee.app;

        console.log(affectedModelInstance);

        next();

    });

    Attendee.afterRemote('create', function(ctx, affectedModelInstance, next) {

        next();

    });
};
