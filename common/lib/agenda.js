/**
 * Created by KimJin-young on 15. 9. 20..
 */

var Agenda = require('agenda');
var connectionOpts = app.get('agendaDB').host + ':' + app.get('agendaDB').port + '/' + app.get('agendaDB').database;
var agenda = new Agenda(connectionOpts);


require('./jobs/conference.js')(agenda);


module.exports = agenda;
