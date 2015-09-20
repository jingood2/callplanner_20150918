/**
 *
 * Created by kimjin-young on 2015. 6. 24..
 */

var Agenda = require('agenda');
var rp = require('request-promise');
var app = require('../server.js');
var _ = require('underscore');
var connectionOpts = app.get('agendaDB').host + ':' + app.get('agendaDB').port + '/' + app.get('agendaDB').database;
var agenda = new Agenda({db: {address: connectionOpts }});

exports.planStartAt = (function(repeat,scheduledAt) {

    var startDate = scheduledAt;
    var whichday;

    console.log('scheduledAt : %s min:%s hour:%s day:%s', startDate, startDate.getMinutes(),startDate.getHours(),startDate.getDate());

    switch(repeat) {

        case 'none' :
            return scheduledAt;
        case 'daily' :
            format = startDate.getMinutes() + ' ' + startDate.getHours() + ' ' + '* * *';
            console.log(format);
            return format;

        case 'weekly' :
            format = startDate.getMinutes() + ' ' + startDate.getHours() + ' ' + '* * ' + startDate.getDay();
            console.log(format);
            return format;

        case 'monthly' :
            format = startDate.getMinutes() + ' ' + startDate.getHours() + ' ' + startDate.getDate() + ' ' +  '* *';
            console.log(format);
            return format;

        default :
            return scheduledAt;
    }


});


exports.addPlanJob = function(jobName, data) {

    if(data.enabled == false) {
        console.log('disabled planCall id : ' + data.id);
        return;
    }

    agenda.define(jobName, function(job,done){

        var ment = '';
        var recordFilename;
        var uuid = require('uuid');
        var historyId = uuid.v4();

        var redis = require('redis');
        var client = redis.createClient(app.get('redis').port,app.get('redis').host);

        var familyCallServerUrl = "http://" +  app.get('familyCallServer').host  + ":" + app.get('familyCallServer').port + "/FamilyCallCore/FamilyCallHttpServlet";

        if(job.attrs.data.ment.file)
          ment = 'ments/' + job.attrs.data.ment.container + '/' + job.attrs.data.ment.file;

        recordFilename = new Date().toISOString() + '.wav';

        /*
        _.each(job.attrs.data.__data.attendees, function(attendee){
          attendee.planId = jobName;
        });
        */

        var options = {
            url: familyCallServerUrl,
            json: true,
            resolveWithFullResponse: true,
            body: {
              "method" : "INIT",
              "id": jobName,                      // jobName -> Free conference call number
              "historyId": historyId,
              "record": job.attrs.data.record,
              "recordFilename" : recordFilename,
              "callType" : job.attrs.data.callType,
              "greetingAnn" : ment
            }
        };

        app.models.Attendee.find({where: {planId: jobName}},function(err,attendees){

            if(err) console.log(err);

            options.attendants = attendees;

            console.log('attendees :' + JSON.stringify(options.attendants));


            client.lpop('conferenceId', function(err,confId){
                var calledAt = new Date();

                var historyInfo = {
                    id : historyId,
                    planId: job.attrs.data.id,
                    pincode : confId,
                    plannerId: job.attrs.data.plannerId,
                    planInfo : {
                        'title': job.attrs.data.title,
                        'enabled': job.attrs.data.enabled,
                        'callType': job.attrs.data.callType,
                        'record': job.attrs.data.record,
                        'recordFilename' : recordFilename,
                        'ment': job.attrs.data.ment,
                        'calledAt' : calledAt,
                        'scheduledAt': job.attrs.data.scheduledAt,
                        'repeat': job.attrs.data.repeat,
                        'attendees': options.attendants}
                };


                if(err) console.log(err);


                options.accessNo = confId;
                rp.post(options)
                    .then(function(response){

                        historyInfo.result = response.statusMessage;


                        app.models.Plan.updateAll({id:jobName},{callState:'connected', "conferenceNum" : confId},function(err,info) {
                            if (err) console.log(err);
                        });

                        _.each(attendees, function(attendee){

                            if(attendee.accept != 'no' && attendee.userId != null) {

                                var secondNoti = {
                                    url: 'http://192.168.4.29:4004/notify/' + attendee.userId,
                                    json: true,
                                    body: { title: job.attrs.data.title, scheduledAt: calledAt }
                                }

                                console.log('secondNoti:' + JSON.stringify(secondNoti));

                                rp.post(secondNoti)
                                    .then(function(response){
                                        console.log('Push Notification Success: ' + attendee.userId);
                                    })
                                    .catch(console.error);
                            }
                        });
                    })
                    .catch(function(response){
                        historyInfo.result = response.cause.message;

                        console.log('send Request Error:' + historyInfo.result);
                    })
                    .finally(function(){

                        console.log('Result of Conference Request: ' + historyInfo.result);

                        app.models.History.create(historyInfo,function(err,obj){
                            if(err) console.log(err);
                        });


                    }); // request

            }); // lpop

        });

      /*
        client.on("error", function(err){

          // redis connection error. Update history.
          console.log("Error" + err);

        });
        */

        /*
        client.lpop('conferenceId', function(err,confId){
          var calledAt = new Date();
          var historyInfo = {
            id : historyId,
            planId: job.attrs.data.id,
            pincode : confId,
            plannerId: job.attrs.data.plannerId,
            planInfo : {
              'title': job.attrs.data.title,
              'enabled': job.attrs.data.enabled,
              'callType': job.attrs.data.callType,
              'record': job.attrs.data.record,
              'recordFilename' : recordFilename,
              'ment': job.attrs.data.ment,
              'calledAt' : calledAt,
              'scheduledAt': job.attrs.data.scheduledAt,
              'repeat': job.attrs.data.repeat,
              'attendees': job.attrs.data.__data.attendees}
          };

          if(err) console.log(err);


          options.accessNo = confId;
          rp.post(options)
            .then(function(response){

              historyInfo.result = response.statusMessage;

              app.models.Plan.updateAll({id:jobName},{callState:'connected', "conferenceNum" : confId},function(err,info){
                if(err) console.log(err);
              });

              _.each(job.attrs.data.__data.attendees, function(attendee){

                var secondNoti = {
                  url: 'http://192.168.4.29:4004/notify/' + attendee.userId,
                  json: true,
                  body: { title: job.attrs.data.title, scheduledAt: calledAt }
                }

                if(attendee.accept != 'no' && attendee.userId != null) {
                  rp.post(secondNoti)
                    .then(function(response){
                      console.log('Push Notification Success: ' + attendee.userId);
                    })
                    .catch(console.error);
                }
              });
            })
            .catch(function(response){
              historyInfo.result = response.cause.message;
            })
            .finally(function(){

              console.log('Result of Conference Request: ' + historyInfo.result);

              app.models.History.create(historyInfo,function(err,obj){
                if(err) console.log(err);
              });

            }); // request

        }); // lpop
        */

        done();

    }); // agenda define

    var job = agenda.create(jobName,data);
    job.attrs.type = 'single';

    // run job for planId
    if(data.repeat == 'now') {
        job.schedule('now');
    } else {
        if(data.repeat == 'once') {
            job.schedule(this.planStartAt(data.__data.repeat,data.__data.scheduledAt));
        } else {
            job.repeatEvery(this.planStartAt(data.__data.repeat,data.__data.scheduledAt));
        }

        var firstNoti = {
          json: true,
          body: { title: data.__data.title, scheduledAt: data.__data.scheduledAt }
        }

      _.each(data.__data.attendees, function(attendee){

          /*(
        if(attendee.userId != null) {
          firstNoti.url = 'http://192.168.4.29:4004/notify/' + attendee.userId;
          console.log('First noti message: ' + JSON.stringify(firstNoti));
          rp.post(firstNoti)
            .then(function(response){
              console.log('Push Notification Success: ' + attendee.userId);
            })
            .catch(console.error);
        }
        */
      });
   }

   job.save();
   agenda.start();

}

exports.removePlanJob = function(jobName) {

    agenda.cancel({name: jobName}, function(err, numRemoved) {
        if(!err) console.log('[removePlanJob] planJob is removed' + numRemoved);
    });
}

exports.removePlanJobArray = function(jobArray) {

    _.each(jobArray,function(job){
        agenda.cancel({name: job}, function(err, numRemoved) {
            if(!err) console.log('[removePlanJobArray] planJobs are removed' + numRemoved);
        });

    });
}
