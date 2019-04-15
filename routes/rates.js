module.exports = {
	get:(req, res, next, data) => {
		
		// Log.view('Обработка GET-запроса контроллером ' + 'rates'.grey);
		
		data.title = 'Тарифы';
		
		// Log.view('Рендеринг вида ' + 'rates'.grey);
		
		res.render('rates', data);
		
		// Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
		Log.delim();
	
	},
	post:(req, res, next, data) => {
		switch(data.ctrl){
			
			case 'save_rates':
				console.log('save rates')
				console.log(data)
				Model
					.checkRequired(data, ['text'])
					.then(() => {
						return Model.config.set({rates:data.text});
					})
					.then(() => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send('complete');
					});
			break;
			
			default:
				res.sendStatus(404);
			break;
			
		}
	}
};