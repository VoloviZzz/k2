module.exports = {
	get:(req, res, next, data) => {
		
		Log.view('Обработка GET-запроса контроллером ' + 'contacts'.grey);
		
		data.title = 'Контакты';
		
		Log.view('Рендеринг вида ' + 'contacts'.grey);
		
		res.render('contacts', data);
		
		Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
		Log.delim();
	
	},
	
	post : (req, res, next, data) => {
		
		console.log(data);
		
		switch(data.ctrl){
			
			case 'set_contacts':
				
				console.log(data);
				Model
					.checkRequired(data, ['phone_code', 'phone_number', 'email', 'card_number', 'address'])
					.then(() => {
						return Model.config.set({
							phone_region_code : data.phone_code,
							phone_number : data.phone_number,
							email : data.email,
							card_number : data.card_number,
							address : data.address
						});
					})
					.then(result => {
						return Model.config.getConfig();
					})
					.then(result => {
						Config = result;
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			
			break;
			default:
				res.sendStatus(404);
			break;
			
		}
		
	}
};