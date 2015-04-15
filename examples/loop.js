'use strict';

var shark = require('../index.js');

shark.init('127.0.0.1:6969');
var loop = shark.loop;

function act(event){
    console.log("Running...");
}

loop(act,2000);
