# shark.io
JS Websocket Client Library for IGNSDK IoT

# Install
```
$ npm install shark.io
```

# Code

~~~javascript
'use strict';

var shark = require('shark.io');

shark.init('127.0.0.1:6969');
var api = shark.api;

api.on('open',function(event){
    event.serial.info(function(data){
        console.log(data);
    });
});
~~~