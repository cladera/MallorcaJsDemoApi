'use strict';

module.exports = {
  db: {
    schemas: {
      db: {
        uri: 'mysql://<user>:<password>@localhost:3306/<schema>-test',
        options: {
          pool: {
            maxConnections: 20,
            minConnections: 0,
            maxIdleTime: 10000
          }
        }
      },

    }
  }
};
