'use strict';

module.exports = {
  cors: {
    origins: ['http://localhost:9000']
  },
  db: {
    schemas: {
      db: {
        uri: 'mysql://root@localhost:3306/mjs-db-development',
        options: {
          pool: {
            maxConnections: 20,
            minConnections: 0,
            maxIdleTime: 10000
          }
        }
      }
    }
  }
};
