
'use strict';

var config = require('./config.json');

var twilio = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);


var Utility = module.exports = {};

Utility.sendSms = function (to, body, cb) {

    return new Promise(function (resolve, reject) {
        twilio.messages.create({
            from: config.TWILIO_FROM,
            to: to,
            body: body,
            statusCallback: config.TWILIO_CALLBACK_URL  //  this  is optional.  you  can  remove  if  you  want
        }, (err, message) => {
            if (err)
                reject(err);
            resolve(message);
        });
     }).then(data => {
        cb(null, {errNum: data.status, errMsg: data.message, errFlag: 0, code: data.code});
    }).catch(e => {
        cb({errNum: e.status, errMsg: e.message, errFlag: 1, code: e.code});
    });
};


Utility.getSms = function (sid, cb) {

    return new Promise(function (resolve, reject) {
        twilio.messages(sid).get((err, message) => {
            if (err)
                reject(err);
            resolve(message);
        });
     }).then(data => {
        cb(null, {errNum: data.status, errMsg: data.message, errFlag: 0, code: data.code});
    }).catch(e => {
        cb({errNum: e.status, errMsg: e.message, errFlag: 1, code: e.code});
    });
};


Utility.getSms = function (cb) {

    return new Promise(function (resolve, reject) {
        twilio.messages.list(function (err, data) {
            if (err)
                reject(err);
            resolve(data);

        });
     }).then(data => {
        cb(null, {errNum: 200, errMsg: "Got the Details", errFlag: 0, code: data});
    }).catch(e => {
        cb({errNum: e.status, errMsg: e.message, errFlag: 1, code: e.code});
    });
};