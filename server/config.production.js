var GLOBAL_CONFIG = require('../global-config');

var isDevEnv = (process.env.NODE_ENV || 'production') === 'production';

module.exports = {
  host: '0.0.0.0',
  port: 3000,
  hostname: '0.0.0.0',
  restApiRoot: GLOBAL_CONFIG.restApiRoot,
  livereload: process.env.LIVE_RELOAD,
  isDevEnv: isDevEnv,
  legacyExplorer: GLOBAL_CONFIG.legacyExplorer,

  remoting: {
    errorHandler: { disalbeStackTrace: false },
    json: { strict: false, limit: '100kb'},
    cors: false,
    urlencoded: { extended: true, limit: '100kb'},
    context: { enableHttpContext: false },
    rest: { normalizeHttpPath: false, xml: false }
  },

  conferenceNum: {
    prefix: '0700000',
    min: 0000,
    max: 1111
  },

  redis: {
    host: 'localhost',
    port: 6379,
    name: 'redis',
    connector: 'redis'
  },

  agendaDB: {
      host: 'localhost',
      port: 27017,
      connector: 'mongodb',
      user: 'callPlanner',
      database:'callPlanner_db2'
  },

  familyCallServer: {
    host: '221.146.204.182',
    port: 9087
  },

  contentmanager: {
    host: 'localhost',
    port: 3003
  }
};
