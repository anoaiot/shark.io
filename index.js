'use strict';

var sharkIO = require('./lib.js');
var websocket = require('faye-websocket');
var events = require('events');
var emitter = new events.EventEmitter();
var status = {};

var chn = function(transport) {
    return new sharkIO(transport, function(channel) {
        emitter.emit('open', channel.objects);
    });
}

function init(address){
    var socket = new websocket.Client("ws://"+address);
    socket.on('open', function(event) {
        console.log("info: Client connected");
        var transport = {
            send: function(data) {socket.send(data)}
        };
        chn(transport);
        socket.on('message', function(event) {
            transport.onmessage(event);
        });
    });
    socket.on('error', function (error) {
        console.log('Connection error: ' + error.message);
        process.exit(1);
    });

    socket.on('close', function () {
        console.log('Connection closed.');
        process.exit(1);
    });
}

if (typeof module === 'object') {
    module.exports = {
        init : function(addr){
            var addrSplit = addr.split(":");
            var ipSplit = addrSplit[0].split(".");
            if(addrSplit.length === 2 && ipSplit.length === 4){
                init(addr);
            }
            else{
                console.log("Init failed!");
                process.exit(1);   
            }
        },
        api : emitter
    };
}