var GLOBAL_CONFIG = require('../global-config');

module.exports = {
  remoting: {
    errorHandler: { disalbeStackTrace: false },
    json: { strict: false, limit: '100kb'},
    cors: false,
    urlencoded: { extended: true, limit: '100kb'},
    context: { enableHttpContext: false },
    rest: { normalizeHttpPath: false, xml: false }
  },

  conferenceNum: {
    prefix: '0707402',
    min: 6100,
    max: 6104
  },

  redis: {
    host: 'docker_redis_1',
    port: 6379,
    name: 'redis',
    connector: 'redis'
  },

  agendaDB: {
      host: 'docker_mongodb_1',
      port: 27017,
      connector: 'mongodb',
      user: 'callPlanner',
      database:'callPlanner_db2'
  },

  familyCallServer: {
    url: 'http://221.146.204.185:9090',
    port: 9090
  },

  contentmanager: {
    url: 'http://221.146.204.186:3001',
    port: 3001
  },
  pushserver: {
    url: 'http://221.146.204.186:3002',
    port: 3002
  }

};
