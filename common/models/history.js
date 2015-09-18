
module.exports = function(History) {

  History.observe('after save', function(ctx, next) {

    if(ctx.isNewInstance) {

    } else {

      var app = History.app;
      var Plan = app.models.Plan;

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
