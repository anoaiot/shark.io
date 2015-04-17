'use strict';

var shark = require('../index.js');
var sleep = require('sleep');

shark.init('127.0.0.1:6969');
var loop = shark.loop;
var gpio;
shark.setup.on('open',function(event){
    gpio = event.gpio;
    gpio.pin(18);
    gpio.mode("out");
});

function act(event){
    console.log("on");
    gpio.write(1);
    sleep.sleep(3);
    console.log("off");
    gpio.write(0);
}

loop(act,500);
