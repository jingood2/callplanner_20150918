/**
 *
 * Created by KimJin-young on 15. 9. 20..
 */

var rp = require('request-promise');
var app = require('../../../server/server.js');
var redis = require('redis');
var client = redis.createClient(app.get('redis').port,app.get('redis').host);

module.exports = function(agenda) {

    agenda.define('request conferenceCall', function(job,done){

        var ment = '';
        var recordFilename;
        var uuid = require('uuid');
        var historyId = uuid.v4();
        var familyCallServerUrl = "http://" +  app.get('familyCallServer').host  + ":" + app.get('familyCallServer').port + "/FamilyCallCore/FamilyCallHttpServlet";

        var options = {
            url: familyCallServerUrl,
            json: true,
            resolveWithFullResponse: true,
            body: {
                "method" : "INIT",
                "id": job.attrs.data.planId,                      // jobName -> Free conference call number
                "historyId": historyId,
                "record": job.attrs.data.record,
                "recordFilename" : recordFilename,
                "callType" : job.attrs.data.callType,
                "greetingAnn" : ment
            }
        };

        // get conferenceId from redis
        client.lpop('conferenceId', function(err,reply){

            options.pincode = reply;

        });


        app.models.plan.attendees({where: {planId: job.attrs.data.planId}},function(err,attendees){

            if(err) console.log(err);

            options.attendants = attendees;

        });



        // query plan info
        app.models.plan.findById(job.attrs.data.planId,{
                include: {
                    relation: 'attendees',
                    scope:{
                        where:{
                            planId: job.attrs.data.planId
                        }
                    }
                }
            },function(err,planObj){



        });





    });

}