var express = require('express');
var router = express.Router();

var shark = require('shark.io');
shark.init('127.0.0.1:6969');
var api = shark.setup;
var apis;
setup.on('open',function(event){
    apis = event.serial;
})
/* GET home page. */
router.get('/', function(req, res) {
  apis.info(function(data){
	res.send(data);
  });
});

module.exports = router;
