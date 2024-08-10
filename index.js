'use strict';

const { sharkIO } = require('./lib');
const websocket = require('faye-websocket');
const events = require('events');
const emitter = new events.EventEmitter();

const chn = function(transport) {
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
        init : function(address = "127.0.0.1:6969"){
            const addrSplit = address.split(":");
            const ipSplit = addrSplit[0].split(".");
            if(addrSplit.length === 2 && ipSplit.length === 4){
                init(address);
            }
        },
        api : emitter,
        setup : emitter,
        loop : function(func,interval){
            if(typeof func !== "function"){
                console.error("Loop input is not function!");
                process.exit(1);
            }
            emitter.on('open',function(event){
                setInterval(function(){
                    func(event);
                }, interval);
            });
        }
    };
}
