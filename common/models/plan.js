// require 'server.js' as you would mormally do in any node.js app
//var app = require('../../server/server');
var _ = require('underscore');
var scheduler = require('../../server/lib/scheduler.js');


module.exports = function(Plan) {

  // plan list endpoint
  Plan.listPlans = function(userId, cb) {

    var app = Plan.app;
    var attendee = app.models.Attendee;

    var ownerId = userId;

    attendee.find({
      include: 'plan', where: {userId: ownerId}
    },function(err,listPlans){
      if(err) {
        console.log(err);
      }
      cb(err,listPlans);
    });

  }

  Plan.remoteMethod(
    'listPlans',
    {
      accepts: { arg: 'userId', type: 'string'},
      http: {path: '/listPlans', verb: 'get', status: '201', errorStatus:'401'},
      returns : { arg: 'listPlans', type: 'array'}
    }

  );

  Plan.details = function(id,cb) {

    var app = Plan.app;
    var attendee = app.models.Attendee;

    Plan.findById(id
    ,function(err,details){
      if(err) console.log(err);
      else {
        attendee.find({where: {planId: id}}, function (err, attendees) {

          if(details)
            details.__data.attendees = attendees;

          cb(err,details);

        });
      }
    });
  }

  Plan.remoteMethod(
      'details',
      {
        accepts: {arg: 'id', type: 'string', required: true},
        http: {path: '/:id/Details', verb: 'get', status: '201', errorStatus:'400'},
        returns : { arg: 'details', type: 'object'}
      }

  );

  Plan.beforeRemote('create', function(ctx, affectedModelInstance, next) {

    /*
    var req = ctx.req;

    if(ctx.req.accessToken) {
      // set FK for subscriber
      req.body.ownerId = req.accessToken.userId;
      next();
    } else {
      var err = new Error();

      ctx.res.status(401);
      ctx.res.render('error', { error: 'error!!!!!!!'});
      next();
    }
    */
    next();
  })

  Plan.afterRemote('create', function(ctx, plan, next) {

    if(ctx.result) {
      console.log('Succeed to create Plan :' + JSON.stringify(ctx.result));
      scheduler.addPlanJob(plan.id,plan);
      next();

    } else {
      console.log('Fail to create Plan!', ctx.error);
      next(ctx.error);
    }

  });

  Plan.observe('before save', function updateAttendeeEmail(ctx, next){

    var app = Plan.app;

    if(ctx.isNewInstance == true) {

      var attendees = ctx.instance.__data.attendees;

      app.models.Subscriber.find({where: {tel: {inq: _.pluck(attendees,'tel') }}}, function(err, subsObj) {
        if(err) console.trace(err);

        _.each(subsObj, function(sub){

          for(var i=0; i < attendees.length;i++){
              if (sub.__data.tel == attendees[i].tel) {
                ctx.instance.__data.attendees[i].userId = sub.__data.id;
                ctx.instance.__data.attendees[i].exchangeEmail = sub.__data.exchangeEmail;
              }
          }

        });
     });
    } else {
      console.log("[before save] Update plan info: ", JSON.stringify(ctx.data));
    }
    next();

  })

  // The after save hook is called after a model change was successfully persisted to the datasource.
  Plan.observe('after save', function(ctx,next){

    var app = Plan.app;

    if(ctx.isNewInstance == true) {

      var attendees = ctx.instance.__data.attendees;

      attendees.forEach(function(attendee){
        attendee.planId = ctx.instance.id;
      });

      // add members included in the lan to attendee
      app.models.Attendee.create(attendees, function(err,attendObj){
        if(err) {
          // ToDo: rollback created Plan
          return console.log(err);
        }

      });

    }else {

      if(ctx.data.attendees){
          app.models.Attendee.destroyAll({planId: ctx.instance.id},function(err,info){

            if(err) {
              console.stack(err);
              next();
            }

            ctx.data.attendees.forEach(function(attendee){
              attendee.planId = ctx.instance.id;
            });

            // add members included in the lan to attendee
            app.models.Attendee.create(attendees, function(err,attendObj){
              if(err) console.trace(err);

              console.log('Update attendees info :' + JSON.stringify(attendObj));

            });

          });

      }

    }
    next();

  });


  Plan.observe('after delete', function(ctx,next){

    var app = Plan.app;

    if(ctx.where.id) {

      app.models.Attendee.destroyAll({planId:  ctx.where.id},function(err,info){

        if(err) console.stack(err);

        console.log('deleted Attendees :' + info.count);

      });

      scheduler.removePlanJob(ctx.where.id);


    }

    next();

  })

};
