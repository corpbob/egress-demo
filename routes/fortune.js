child_process = require('child_process');
var express = require('express');
var router = express.Router();
var command = process.env.FORTUNE_COMMAND;

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(!command){
    command="fortune";
  }
  var fortune = child_process.execSync(command);
  res.send(fortune.toString() + '\n');
});

module.exports = router;
