var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var messages = [];

io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('add chat', function(msg){
  	messages.push(msg);
    console.log('message: ', msg);
    socket.broadcast.emit('chat message', msg);
  });



  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});