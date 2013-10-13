nodejs-json-boilerplate
=======================

Node.js project boilerplate for a JSON API server with CORS enabled.  This 
project is based loosely on the server portion of this one: 
https://github.com/angular-app/angular-app with modifications that adhere to 
my own opinions on how things should be laid out.  It's stack consists of:

* Node.js
* Express
* Mongoose (MongoDB object modeling tool)
* Cansecurity (authentication)

A very minimal User model and controller have been implemented to get basic
authentication working. One can create, list, show, update and destroy a user
as well as protect a route that requires an authentication token.  An
authentication token can be retrieved by initiating a login.

The Gruntfile has the following features:

* jshint: Validate files with JSHint.
* simplemocha: Run tests with mocha.
* watch: Monitor spec directory for changes. If any changes are detected it
  automatically runs the tests.
* default: Alias for "jshint", "simplemocha", and "watch" tasks.
* server: Runs the app and watches for code changes. If any changes are
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
* grunt server

Now you can use a tool like curl or my personal favorite httpie [https://github.com/jkbr/httpie](https://github.com/jkbr/httpie).

**Create a user account**
    $ http POST localhost:3000/user username=test password=secret
    HTTP/1.1 200 OK
    Access-Control-Expose-Headers: X-CS-Auth,X-CS-User
    Connection: keep-alive
    Content-Length: 172
    Content-Type: application/json; charset=utf-8
    Date: Sun, 13 Oct 2013 19:05:51 GMT
    X-Powered-By: Express

    {
        "user": {
            "__v": 0,
            "_id": "525aef0f522c9cae4f000001",
            "hash": "$2a$10$dbeLDvEXhgZGaqSudaM6ZOr19EBoXyfq8I74KRca.ho6oC1njMz0a",
            "username": "test"
        }
    }

**Login with a POST request**  

    $ http POST localhost:3000/login --auth test:secret
    HTTP/1.1 200 OK
    Access-Control-Expose-Headers: X-CS-Auth,X-CS-User
    Connection: keep-alive
    Date: Sat, 12 Oct 2013 19:16:41 GMT
    Transfer-Encoding: chunked
    X-CS-Auth: success=dcfbba94a25561a1405acb7bcc7d8a51b021534a:test:1381606301826
    X-CS-User: {"username":"test","hash":"$2a$10$/mPaKKAguhzmlxf1mZivMuS8kFEvjiBzxNlKXONfrinjmg94nJaQO","token":"e1df8416-a77e-4e0f-a6e4-78f594bbf980","_id":"5258d1a6f67bb5b6b3000001","__v":0}
    X-Powered-By: Express

**Try to get a protected resource**  

    $ http localhost:3000/authorized
    HTTP/1.1 401 Unauthorized
    Access-Control-Expose-Headers: X-CS-Auth,X-CS-User
    Connection: keep-alive
    Content-Length: 15
    Content-Type: text/html; charset=utf-8
    Date: Sat, 12 Oct 2013 19:17:51 GMT
    X-Powered-By: Express

    unauthenticated

**Try to get a protected resource with authorization token**  

    $ http localhost:3000/authorized X-CS-Auth:dcfbba94a25561a1405acb7bcc7d8a51b021534a:test:1381606301826
    HTTP/1.1 200 OK
    Access-Control-Expose-Headers: X-CS-Auth,X-CS-User
    Connection: keep-alive
    Content-Length: 33
    Content-Type: application/json; charset=utf-8
    Date: Sat, 12 Oct 2013 19:18:40 GMT
    X-CS-Auth: success=c040cb6c83617f1dc43c5fea0f6a0a27b61af41b:test:1381606420094
    X-CS-User: {"username":"test","hash":"$2a$10$/mPaKKAguhzmlxf1mZivMuS8kFEvjiBzxNlKXONfrinjmg94nJaQO","token":"e1df8416-a77e-4e0f-a6e4-78f594bbf980","_id":"5258d1a6f67bb5b6b3000001","__v":0}
    X-Powered-By: Express

    {
      "authorized": "hello world"
    }
