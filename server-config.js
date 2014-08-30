var express = require('express');
var app = express();

app.use('/', function(req, res, next){
  console.log(req.url);
  if(req.url === '/'){
    res.sendFile('./public/app/media/stream.html',{root:__dirname}, function(err){
      console.log(err);
    });
  } else {
    next();
  }
});
app.use('/',function(req, res, next){
  res.type('javascript');
  console.log(req.url); 
  if(req.url.match(/^\/(?:public|bower)/)){
    res.sendFile(__dirname+req.url, function(err){
      console.log(err);
    });
  } else {
    next();
  }
});
module.exports = app;