const http = require('http');
const express = require('express');
const app = express();

//--------------------------------------------------------------

var twilio_module = require('./twilio_module');
var config = require('./config.json');

//--------------------------------------------------------------

app.post('/sms', (req, res) => {

    var toMobile = "+918050093155";
    var toMessage = "testing messsage";

    twilio_module.sms(toMobile, toMessage, function (err, result) {
    });

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end({err: 0, data: "success"});
});


app.get('/sms', (req, res) => {

    var sid = config.TWILIO_ACCOUNT_SID;
    var data = {};
    twilio_module.getSms(sid, function (err, result) {
        if (err)
            data = {err: 0, data: err}
        else
            data = {err: 0, data: result};

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end({err: 0, data: data});
    });
});



app.get('/allSms', (req, res) => {

    var data = {};
    twilio_module.getAllSms(function (err, result) {
        if (err)
            data = {err: 0, data: err};
        else
            data = {err: 0, data: result};

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end({err: 0, data: data});
    });
});


//--------------------------------------------------------------

http.createServer(app).listen(1234, () => {
    console.log('server listening on port 1234');
});