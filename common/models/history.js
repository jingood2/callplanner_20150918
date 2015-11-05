
module.exports = function(History) {

  History.observe('after save', function(ctx, next) {

    if(ctx.isNewInstance) {

      if(ctx.instance.__data.planInfo.result != 'OK') {

        if(ctx.instance.__data.planInfo.repeat == "now") {

          var app = History.app;
          var Plan = app.models.Plan;

          Plan.destroyAll({planId:  ctx.instance.planId},function(err,info){

            if(err) console.stack(err);

          });
        }

      }

    } else {

      var app = History.app;
      var Plan = app.models.Plan;

      var redis = require('redis'),
          client = redis.createClient(app.get('redis').port,app.get('redis').host);
      // restore conference number to redis
      if(ctx.instance.pincode != null) {
        client.lpush("conferenceId",ctx.instance.pincode);
        console.log('restore confId :' + ctx.instance.pincode);
      }

      if(ctx.instance.__data.planInfo.repeat == "now") {

        // Don't save a conference about now
        Plan.destroyAll({planId:  ctx.instance.planId},function(err,info){

          if(err) console.stack(err);

          console.log('Delete Plan with repeat type of now :' + info.count);

        });

      } else {
        Plan.updateAll({id:ctx.instance.planId},{callState: 'disconnected'},function(err,info){
          if(err)
            console.log(err);
        });
      }
    }
    next();
  });

};
