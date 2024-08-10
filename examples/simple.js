'use strict';

var shark = require('../index.js');

shark.init('192.168.100.189:6969');
var setup = shark.setup;

setup.on('open',function(event){
    event.serial.info(function(data){
        console.log(data);
        process.exit(1);
    });
});
