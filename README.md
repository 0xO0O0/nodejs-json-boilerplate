nodejs-json-boilerplate
=======================

Node.js project boilerplate for a JSON API server mostley intended to be used
with an AngularJS client.  This project is based loosley on the server portion
of this one: https://github.com/angular-app/angular-app with modifications that
ahere to my own opinions on how things should be laid out.  It's stack consists
of:

* Node.js
* Express
* Mongoose (MongoDB object modeling tool)
* Passport (authentication)

A very minimal User model and controller have been implemented to get basic
authentication working. One can create, list, show, update and destroy a user
as well as protect a route that requires an authentication token.  An
authentication token can be retrieved by initiating a login.  Currently the
token is static however to make it more secure it might make more sense to
generate a unique token on each login.

The Gruntfile has the following features:

* jshint: Validate files with JSHint.
* simplemocha: Run tests with mocha.
* watch: Monitor spec directory for changes. If any changes are detected it
  automatically runs the tests.
* default: Alias for "jshint", "simplemocha", and "watch" tasks.
* supervise: Runs the app and watches for code changes. If any changes are
  detected it automatically reloads the app.
* test: alias for "simplemocha" task.

##Getting Started

**Prerequisites**

* Node.js ([http://www.nodejs.org/](http://www.nodejs.org/))
* MongoDB ([http://www.mongodb.org/](http://www.mongodb.org/))

Follow the installation instructions for each of those packages.

* git clone git@github.com:socketwiz/nodejs-json-boilerplate.git
* cd nodejs-json-boilerplate
* npm install
* git supervise

Now you can use a tool like curl or my personal favorite httpie [https://github.com/jkbr/httpie](https://github.com/jkbr/httpie).

**Login with a POST request**  

    $ http POST localhost:3000/login username=test password=secret
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 59
    Content-Type: application/json; charset=utf-8
    Date: Wed, 25 Sep 2013 18:57:13 GMT
    X-Powered-By: Express

    )]}',
    {
      "token": "bcd086d7-8bdb-41b4-a893-e2a5d1895422"
    }

**Try to get a protected resource**  

    $ http localhost:3000/authorized
    HTTP/1.1 401 Unauthorized
    Connection: keep-alive
    Date: Wed, 25 Sep 2013 19:34:20 GMT
    Transfer-Encoding: chunked
    X-Powered-By: Express

    Unauthorized

**Try to get a protected resource with authorization token**  

    $ http localhost:3000/authorized\?token=bcd086d7-8bdb-41b4-a893-e2a5d1895422
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 39
    Content-Type: application/json; charset=utf-8
    Date: Wed, 25 Sep 2013 19:31:46 GMT
    X-Powered-By: Express

    )]}',
    {
      "authorized": "hello world"
    }
