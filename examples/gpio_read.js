'use strict';

var shark = require('../index.js');
var sleep = require('sleep');

shark.init('127.0.0.1:6969');
var loop = shark.loop;
var gpio;
shark.setup.on('open',function(event){
    gpio = event.gpio;
    gpio.set(18);
    gpio.mode("in");
    gpio.read(18,function(out){
       out.stream.connect(function(data){
          if(data == 1){
             console.log("ON")
          }
       });
    });
});
