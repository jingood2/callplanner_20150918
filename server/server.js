var loopback = require('loopback');
var boot = require('loopback-boot');
var bunyan = require('bunyan');
var bunyanMiddleware = require('bunyan-middleware');

var app = module.exports = loopback();

/*
var logger = bunyan.createLogger({
    name: 'callplanner',
    streams:[
        {
            level: 'debug',
            type: 'rotating-file',
            path: './access.log',
            period: '1d',
            count:3
        },
        {
            level: 'error',
            type: 'rotating-file',
            path:  './error.log',
            period: '1d',
            count:3
        }
    ]
})
*/

app.middleware('initial',bunyanMiddleware(
    {
        headerName : 'X-Request-Id',
        propertyName: 'reqId',
        logName: 'req_id',
        obscureHeaders: [],
        logger: bunyan.createLogger({
            name: 'callplanner',
            streams:[
                {
                    level: 'debug',
                    path: './access.log',
                    period: '1d',
                    count: 3
                },
                {
                    level: "error",
                    type: 'rotating-file',
                    path: './error.log',
                    period: '1d',
                    count: 3
                }
            ]})
    })
);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
