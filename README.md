nodejs-json-boilerplate
=======================

Node.js project boilerplate for a JSON API server mostley intended to be used
with an AngularJS client.  This project is based loosley on the server portion
of this one: https://github.com/angular-app/angular-app with modifications that
ahere to my own opinions on how things should be laid out.  It's stack consists
of:

* Node.js
* Express
* MongoDB driver

At some point I intend to add passport back into it but I don't like the way
the other project accessed MongoDB with rest API's, so I would like to rework
it using the MongoDB driver.  Currently this project is designed strictly as
a JSON API server, but it wouldn't take much to make it a full fledged HTML
server if that is what you desire.

The Gruntfile has the following features:

* jshint: Validate files with JSHint.
* karma: Run Karma test runner.
* default: Alias for "jshint", "karma" tasks.
* supervise: Runs the app and watches for code changes. If any changes are
  detected it automatically reloads the app.
* test: alias for "karma" task.
