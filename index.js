// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req,res,next) => {
  if(req.params.date){
    if ((/[0-9]{13}/).test(req.params.date)) {
      req.time = new Date(Number(req.params.date)).toUTCString();
      req.unix = Number(req.params.date);
    } else {
      req.time = new Date(req.params.date).toUTCString();
      req.unix = new Date(req.params.date).valueOf();
    }
  } else {
    req.unix = Date.now().valueOf();
    req.time = (new Date()).toUTCString();
  }
  next();
}, (req,res) => {
  if (req.unix){
    res.json({unix: req.unix, utc: req.time});
  } else {
    res.json({error: req.time})
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
