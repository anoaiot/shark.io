'use strict';

/*
pin 12 = out
pin 6 = ground
http://www.element14.com/community/docs/DOC-73950/l/raspberry-pi-2-model-b-gpio-40-pin-block-pinout
*/

var shark = require('../index.js');
var sleep = require('sleep');

shark.init('127.0.0.1:6969');
var loop = shark.loop;
var gpio;
shark.setup.on('open',function(event){
    gpio = event.gpio;
    gpio.set(18);
    gpio.mode("out");
});

function act(event){
    console.log("on");
    gpio.write(18,1);
    sleep.sleep(3);
    console.log("off");
    gpio.write(18,0);
}

loop(act,500);
