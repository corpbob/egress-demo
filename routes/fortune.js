child_process = require('child_process');
var express = require('express');
var router = express.Router();
var command = process.env.FORTUNE_COMMAND;
var host=process.env.HOST
var port=process.env.PORT

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.query.misbehave && req.query.misbehave == "true"){
    res.sendStatus(503);
    return;
  }

  if(!command){
    command="fortune";
  }
 
  console.log("executing command: " + command);
  var fortune = child_process.execSync(command);
  res.send(fortune.toString() + '\n');
});

router.get('/test', function(req, res, next) {
  console.log(req.headers);
  user_agent=req.headers['user-agent'];
  command= 'curl -v -H ' + '"User-Agent: ' + user_agent + '" http://' + host + ':' + port + '/fortune';
  console.log("executing command: " + command);
  var fortune = child_process.execSync(command);
  res.send(fortune.toString() + '\n');
});

module.exports = router;
