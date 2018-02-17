module.exports = {
	
	post:(req, res, next, data) => {
		
		switch (data.ctrl) {
			
			case 'save_name' :
			
				Model
					.checkRequired(data, ['name'])
					.then(() => {
						Model
							.config.set({
								name : data.name
							});
					})
					.then(result => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			
			break;
			case 'save_slogan':
				
				Model
					.checkRequired(data, ['name'])
					.then(() => {
						Model
							.config.set({
								slogan : data.name
							});
					})
					.then(result => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			
			break;
			case 'save_bottom_description':
			
				Model
					.checkRequired(data, ['text'])
					.then(() => {
						Model
							.config.set({
								bottom_description : data.text
							});
					})
					.then(result => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			
			break;
			case 'save_region_code' :
				
				Model
					.checkRequired(data, ['name'])
					.then(() => {
						Model
							.config.set({
								phone_region_code : data.name
							});
					})
					.then(result => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'save_phone_number' :
				
				Model
					.checkRequired(data, ['name'])
					.then(() => {
						Model
							.config.set({
								phone_number : data.name
							});
					})
					.then(result => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
					
			break;
			case 'saveSlideTitle' :
			
				Log.view('Сохранение заголовка слайда');
		
				Model
					.checkRequired(data, ['id', 'title'])
					.then(() => {
						
						console.log(1)
						return Model.slides.set({id : data.id, title : data.title});
						
					})
					.then(result => {
						console.log(2)
						console.log(result)
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
				
			break;
			case 'saveSlideSubTitle' :
		
				Log.view('Сохранение подзаголовка слайда');
		
				Model
					.checkRequired(data, ['id', 'subtitle'])
					.then(() => {
						return Model.slides.set({id : data.id, subtitle : data.subtitle});
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'saveSlideText' :
		
				Log.view('Сохранение текста слайда');
		
				Model
					.checkRequired(data, ['id', 'text'])
					.then(() => {
						return Model.slides.set({id : data.id, text : data.text});
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'saveSlidePublic' :
		
				Log.view('Сохранение состояния публикации слайда');
		
				Model
					.checkRequired(data, ['id', 'state'])
					.then(() => {
						return Model.slides.set({id : data.id, 'public' : data.state});
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'saveSlidePriority' :
		
				Log.view('Сохранение значения приоритета слайда');
		
				Model
					.checkRequired(data, ['id', 'priority'])
					.then(() => {
						return Model.slides.set({id : data.id, 'priority' : data.priority});
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'createNewSlide' :
				
				Log.view('Создание нового слайда');
				
				Model
					.slides.add({creator : 1, sliderId : 1})
					.then(slideId => {
						res.send(String(slideId));
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'deleteSlide' :
				
				Log.view('Удаление слайда');
				
				Model
					.checkRequired(data, ['id'])
					.then(() => {
						return Model.slides.del({id : data.id});
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			default :
				res.send(404);
			break;
		}
		// res.send(JSON.stringify(data));
	}
};