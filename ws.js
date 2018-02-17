var 
	config = require("./config"),
	WebSocketServer = require('ws').Server
	wss = new WebSocketServer({port: config.WSPort});
	// router = require('./router.js'),
	// Routes = require('./routes.js'),
	// Log = require('./log.js');

	Log.view('Websocket-сервер запущен. Прослушивается порт ' + ('#' + config.WSPort).grey);

wss.on('connection', function(ws){	// обработчик нового подключения

	Log.view('!--- !--- !--- '.green + 'Установлено подключение websocket');
	// Views[]	// добавляем подключение в массив вкладок
	
	ws.on('message', function(data){	// обработчик входящего сообщения подключения

		Log.view('<--- <--- <--- '.green + 'Получен websocket-запрос', 1);
		Log.data(data, 1)
		Log.view('Передача управления маршрутизатору WebSocket-запросов', 1);
		
		Router.ws(ws, data);
		
	});
	
	ws.on('close', function(){
		
		Log.view('X--- X--- X---'.grey + ' Сработал триггер закрытия WebSocket-соединения');
		
		// if (typeof Views[ws.viewId] !== 'undefined') delete(Views[Views.indexOf(ws.viewId)]);
		if (Views[ws.viewId]) {
			
			Log.view('Рассылка сообщения о закрытии по консультантам');
					
			Wss.clients.forEach(client => {
			
				if (client.route == 'consult') {
					
					var tab = Views[ws.viewId];
					tab.connection = false;
					
					client.send(JSON.stringify({action : 'closeTab', tab : tab}));
					
					Log.view('В просмотр ' + ('#' + client.viewId).grey + ' отправлено сообщение о закрытии вкладки ' + ('#' + ws.viewId.grey));
					
				}
				
			});
			
			delete(Views[ws.viewId]);

		}
		else {
			
			Log.data('No Views[ws.viewId]');
			
		}
		
		Log.view('Закрыто соединение ' + ('#' + ws.viewId).grey);

		
	});
	
});

module.exports = wss;