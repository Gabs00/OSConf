var express = require('express');
var app = express();

var server = app.listen(5000);

var io = require('socket.io')(server);

console.log('Listening on ', 5000);

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
var connections = [];
io.on('connection', function(socket){
  console.log('received connection');
  connections.push(socket);
  socket.on('init', function(offer){
    console.log('received init offer req');
    connections.forEach(function(sock){
      if(socket !== sock){
        sock.emit('init', offer);
      }
    });
  });
  socket.on('ans', function(answer){
    console.log('received ans offer');
    connections.forEach(function(sock){
      if(socket !== sock){
        sock.emit('init', answer);
      }
    });   
  });
});

module.exports = app;