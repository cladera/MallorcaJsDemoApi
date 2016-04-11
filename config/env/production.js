'use strict';

module.exports = {
  db: {
    schemas: {
      db: {
        uri: process.env.DB_URI || 'mysql://root@localhost:3306/mjs-db',
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
