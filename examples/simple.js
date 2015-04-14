'use strict';

var shark = require('../index.js');

shark.init('127.0.0.1:6969');
var api = shark.api;

api.on('open',function(event){
    event.serial.info(function(data){
        console.log(data);
    });
});
