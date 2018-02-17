module.exports = {
	get:(req, res, next, data) => {
		
		Log.view('Обработка GET-запроса контроллером ' + 'terms'.grey);
		
		data.title = 'Условия аренды';
		
		Log.view('Рендеринг вида ' + 'terms'.grey);
		
		res.render('terms', data);
		
		Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
		Log.delim();
	
	},
	post:(req, res, next, data) => {
		switch(data.ctrl){
			
			case 'save_terms':
				Model
					.checkRequired(data, ['text'])
					.then(() => {
						return Model.config.setConfigTerms({terms:data.text});
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