var ws = new WebSocket("ws:\\" + Config.WSHost + ":" + Config.WSPort);

// обработка запроса от сервера
ws.onmessage = function(event){
	
	console.log('ws onmessage')
	console.log(event.data)
	
	var data = JSON.parse(event.data);
	
	if (typeof WSActions[data.action] !== 'undefined') {
		WSActions[data.action](data);
	}
	else {
		console.log('Undefined action ' + data.action);
	}
	
};

// установка WebSocket-соединения
ws.onopen = function () {
	
	ws.send(JSON.stringify({
		route : 'static',
		action : 'activate',
		token : Config.WSToken
	}));
	
	ws.viewId = Config.WSToken;
	
};

ws.onerror = function (err) {
	console.log('ws error')
	console.log(err)
}

var WSActions = {
	
	'open' : data => {
		window.open(data.url);
	},
	
	'newMessage' : data => {
		consult.createMessage(data.message);
	}
	
};
