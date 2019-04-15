module.exports = {
	get:(req, res, next, data) => {
		
		// Log.view('Обработка GET-запроса контроллером ' + 'reviews'.grey)
		
		data.title = 'Отзывы';
		
		Model
			.reviews.get({public : data.admin ? undefined : true})
			.then(result => {
				// console.log(result);
				data.reviews = result;
				res.render('reviews', data);
			})
			.catch(error => {
				res.send(error.toString());
			});
		
		
	},
	
	post:(req, res, next, data) => {
		
		// Log.view('Обработка POST-запроса контроллером ' + 'reviews'.grey)
		switch (data.ctrl) {
			
			case 'add_review':
				
				Model
					.checkRequired(data, ['name', 'text'])
					.then(() => {
						return Model.reviews.add({name : data.name, text : data.text, creator : 1});
					})
					.then(result => {
						// console.log(result);
						res.send(String(result));
					})
					.catch(error => {
						// console.log('-------------------------')
						// console.log(error)
						res.send(error.toString());
					});
				
			break;
			case 'set_public':
				
				console.log('set public');
				console.log(data);
				
				Model
					.checkRequired(data, ['id', 'state'])
					.then(() => {
						return Model.reviews.set({public : data.state, id : data.id});
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'delete_review':
			
				console.log(data);
				
				Model
					.checkRequired(data, ['id'])
					.then(() => {
						return Model.reviews.del({id : data.id});
					})
					.then(result => {
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
		// res.send(JSON.stringify(data));
		
	},
	
	ws : (ws, data) => {
		// Log.view('Обработка Websocket-запроса контроллером ' + 'reviews'.grey)
	}
};