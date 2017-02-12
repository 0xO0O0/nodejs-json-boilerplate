var path = require('path');

module.exports = {
  mongo: {
    host: 'localhost',
    port: 27017,
    db: 'restapp'
  },
  security: {
    dbName: ''                                              // The name of database that contains the security information
  },
  server: {
    listenPort: 3000,                                       // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    securePort: 8433,                                       // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
    distFolder: path.resolve(__dirname, '../client/dist'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
    staticUrl: '/static',                                   // The base url from which we serve static files (such as js, css and images)
    sessionKey: 'secret-session-key',                       // The secret for encrypting the session
    allowedDomains: []                                      // List of domains to enable for CORS
  }
};
