child_process = require('child_process');
var express = require('express');
var http = require('http');
var router = express.Router();
var command = process.env.FORTUNE_COMMAND;
var host=process.env.HOST
var port=process.env.PORT
var url = process.env.GET_URL;

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.query.misbehave && req.query.misbehave == "true"){
    var percent = 50;
    if(req.query.percent){
      var tmp = parseFloat(req.query.percent);
      if(!isNaN(tmp)){
        percent = tmp; 
      }
      console.log("percent is ", percent);
    }
    
    var r = Math.random();
    console.log("random number is ", r);
    if(r < percent/100){
      console.log("Sending 503");
      res.sendStatus(503);
      return;
    }
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

router.get('/test2', function(req,res,next){
 
  console.log("Getting ", url);
  http.get(url, function(response){
     
      var rawData = '';
      response.on('data', function(chunk){
        rawData+=chunk;
      });

      response.on('end', function(){
        console.log(rawData);
        res.send('OK');
      }); 
  });
});

module.exports = router;
