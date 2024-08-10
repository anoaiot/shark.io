'use strict';

var shark = require('../index.js');

shark.init('192.168.100.189:6969');
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
