/**
 * This is the beginning of the app
 */
 
var restify = require('restify');

function respond(req, res, next){
    res.send('Hello ' + req.params.name);
    return next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(process.env.PORT, function(){
    console.log("%s listening at %s", server.name, server.url);
});