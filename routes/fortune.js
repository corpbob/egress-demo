child_process = require('child_process');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var command= "curl http://bcorpus7.ellipticurve.com:8080/helloworld/";
  var fortune = child_process.execSync(command);
  res.send(fortune.toString() + '\n');
});

module.exports = router;
