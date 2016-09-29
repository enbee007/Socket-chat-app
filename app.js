var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + "/public"));




io.on('connection', function(socket){
	//new user connectes		
	console.log('a user connected');

	//message to the user from server
	socket.emit("welcomeFromServer", {
		text: "HEY USER!!! Welcome to NIBIN's Server.",
		date: new Date()
	});

	//read message from the user
	socket.on("message", function(message){
		
		//print it on the console
		console.log("user: "+message.text);
		
		//emit(broadcast) it to other users except himself......"io.emit" is used to emit to himself too.
		io.emit("messageFromUser", message);
	});
	
	//the user disconnects
	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
});

server.listen(PORT, function(){
	console.log("server started at port "+PORT);
});

