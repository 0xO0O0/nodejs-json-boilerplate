nodejs-json-boilerplate
=======================

Node.js project boilerplate for a json API server.  This project is based
loosley on the server portion of this one: https://github.com/angular-app/angular-app with
modifications that suite my needs.  It's stack consists of:

* Node.js
* Express
* MongoDB driver

At some point I intend to add passport back into it but I don't like the way
the other project accessed MongoDB with rest API's, so I would like to rework
it using the MongoDB driver.  Currently this project is designed strictly as
a json API server, but it wouldn't take much to make it a full fledged HTML
server if that is what you desire.

The Gruntfile has the following features:

* jshint: Validate files with JSHint.
* nodeunit: Run Nodeunit unit tests.
* default: Alias for "jshint", "nodeunit" tasks.
* timestamp: Log the current time and date to the console.
* supervise: Runs the app and watches for code changes. If any changes are
  detected it automatically reloads the app.
