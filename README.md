# shark.io
JS Websocket Client Library for IGNSDK IoT

# Install
```
$ npm install shark.io
```

# Examples

## NodeJS

### simple.js
~~~javascript
'use strict';

var shark = require('shark.io');

shark.init('127.0.0.1:6969');
var setup = shark.setup;

setup.on('open',function(event){
    event.serial.info(function(data){
        console.log(data);
        process.exit(1);
    });
});
~~~

### loop.js
~~~javascript
'use strict';

var shark = require('shark.io');

shark.init('127.0.0.1:6969');
var loop = shark.loop;

function act(event){
    console.log("Running...");
}

loop(act,2000);
~~~

### led_blink.js
~~~javascript
'use strict';

var shark = require('shark.io');
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
~~~

### gpio_read.js
~~~javascript
'use strict';

var shark = require('shark.io');
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
~~~

## HTML5
~~~html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script type="text/javascript" src="../lib.js"></script>
        <script type="text/javascript">
            function output(message)
            {
                var output = document.getElementById("output");
                output.innerHTML = output.innerHTML + message + "\n";
            }
            window.onload = function() {
                var socket;
                
                socket = new WebSocket("ws://127.0.0.1:6969");

                socket.onclose = function()
                {
                    console.error("web channel closed");
                };
                socket.onerror = function(error)
                {
                    console.error("web channel error: " + error);
                };
                socket.onopen = function()
                {
                    output("WebSocket connected, setting up IGNSDK API.");

                    new sharkIO(socket, function(channel) {
                        window.fs = channel.objects.fs;
                        window.sys = channel.objects.sys;
                        window.net = channel.objects.net;
                        window.serial = channel.objects.serial;
                        serial.info(function(event) {
                            output("Device count: "+event.count);
                            event.device.forEach(function(i){
                                output("Location : "+i.location); 
                                output("Port Name : "+i.port); 
                                output("---------------------------"); 
                            });
                        });
                        //output("Connected to WebChannel, ready to send/receive messages!");
                    });
                }
            }
        </script>
        <style type="text/css">
            html {
                height: 100%;
                width: 100%;
            }
            #input {
                width: 400px;
                margin: 0 10px 0 0;
            }
            #send {
                width: 90px;
                margin: 0;
            }
            #output {
                width: 500px;
                height: 300px;
            }
        </style>
    </head>
    <body>
        <textarea id="output"></textarea><br />
        <input id="input" /><input type="submit" id="send" value="Send" onclick="javascript:click();" />
    </body>
</html>
~~~