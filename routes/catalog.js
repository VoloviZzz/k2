module.exports = {
	get:(req, res, next, data) => {
		
		// Log.view('Обработка GET-запроса контроллером ' + 'catalog'.grey);
		
		// console.log(data);
		
		// data.title = 'Каталог инструмента';
		
		Model
			.positions.getPositions()	// запрос позиций
			.then(positions => {	// запись результатов
				
				data.positions = positions;
				return true;
				
			})
			.then(() => {	// рендеринг страницы
				
				// Log.view('Рендеринг вида ' + 'catalog'.grey);
				
				res.render('catalog', data);
				
			});
	},
	post:(req, res, next, data) => {
	
		console.log(data);
		
		switch(data.ctrl){
			case 'add_pos':
				
				//добавление позиции
				Model
					.positions.addPosition({
						creator:1
					})
					.then(result => {
						res.send(String(result));
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'delete_pos':
				
				// Log.view('Обработка запроса удаления позиции');
				
				Model
					.checkRequired(data, ['pos'])
					.then(() => {
						return Model.positions.del({id : data.pos});
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			default:
				next(new Error('Undefined controller'));
			break;
		}
		
	}
};