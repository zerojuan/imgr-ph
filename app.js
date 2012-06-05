/**
 * This is the beginning of the app
 */

var restify = require('restify');
var connect = require('connect');

var config = require('./config');
var api = require('./api');

api.connectMongoose(config.creds);

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.authorizationParser());
server.use(function authenticate(req, res, next){
    //do authentication logic here
    console.log(req.authorization.basic.password);
    return next();
});

server.get('/messages', api.getMessages);
server.post('/messages', api.postMessage);

var connectApp = connect()
    .use(connect.logger())
    .use(connect.bodyParser())
    .use(connect.query())
    .use(connect.cookieParser())
    .use(connect.static(__dirname + "/public"))
    .use('/api', function(req, res){
        server.server.emit('request', req, res);
    });

//server.listen(process.env.PORT, function(){
 //   console.log('%s listening at %s, love & peace', server.name, server.url);
//});

connectApp.listen(process.env.PORT, function(){
    console.log('%s listening at %s, love & peace', server.name, connectApp.url);
});
