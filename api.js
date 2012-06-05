var mongoose = require('mongoose');

var Message;

function connectMongoose(creds){
    var db = mongoose.connect(creds.mongoose_auth);
    var Schema = mongoose.Schema;
    
    var MessageSchema = new Schema({
        message: String,
        date: Date
    });
    mongoose.model('Message', MessageSchema);
    Message = mongoose.model('Message');
}

function getMessages(req, res, next){
    Message.find().limit(20).sort('date', -1).execFind(function(arr,data){
        res.send(data);
    });
}

function postMessage(req, res, next){
    var message = new Message();
    message.message = req.params.message;
    message.date = new Date();
    message.save(function(){
        res.send(req.body);
    });
}

exports.getMessages = getMessages;

exports.postMessage = postMessage;

exports.connectMongoose = connectMongoose;