'use strict';

var GLOBAL_CONFIG = require('../global-config');

var env = (process.env.NODE_ENV ||  'production');
var isDevEnv = env === 'production';

module.exports = {

  conferenceNum: {
    prefix: '0707402',
    min: 6100,
    max: 6104
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
    url: 'http://221.146.204.185:9090',
  },

  contentmanager: {
    url: 'localhost:3001',
  },
  pushserver: {
    url: 'localhost:3002',
  }
};
