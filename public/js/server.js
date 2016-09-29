	var socket = io();

	//as soon as user connects to the server
	socket.on("connect", function(){
		console.log("Connected to nibin's SERVER!");
	});

	//read message from the NIBIN's Server
	socket.on("welcomeFromServer", function(message){
		console.log("NIBIN: "+message.text+"\nDATE: "+message.date);
	});

	//print message from another user on the console
	socket.on("messageFromUser", function(message){
		
		//print it on the console
		console.log("user: "+message.text);
		$(".displayMessage").append("<p>message: <b><i>" + message.text + "</i></b></p>");
		
	});

	//message from the user
	var $form = $("#messageForm");
	$form.on("submit", function(event){

		//to prevent the by default message printing on the url
		event.preventDefault();

		//extract message from input
		var $message = $form.find("input[name=message]");
		socket.emit("message", {
			text: $message.val() + "!!!!!!!!nibin"
		});

		$message.val("");
		
	});

