'use strict';

module.exports = {
  cors: {
    origins: ['http://mjs-client.s3-website-us-east-1.amazonaws.com']
  },
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
