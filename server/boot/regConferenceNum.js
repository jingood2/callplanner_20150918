/**
 *
 * Created by kimjin-young on 2015. 7. 1..
 */

module.exports = function(app) {
    var redis = require('redis'),
        sprintf = require('sprintf').sprintf,
        client = redis.createClient(app.get('redis').port,app.get('redis').host),
		conferenceNum,	
        phone;

	conferenceNum = app.get('conferenceNum');

    client.on("error", function(err){
        console.log("Error : " + err);
    });

    for (var i=conferenceNum.min; i <= conferenceNum.max;i++) {
        phone = sprintf('%s%04d', conferenceNum.prefix,i);
        client.lpush("conferenceId",phone);
    }



}




