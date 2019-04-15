var fs = require("fs"),
    multiparty = require('multiparty'),
	Files = require("../files.js");
	
module.exports = {

	post:(req, res, next, data) => {

		// Log.view('Обработка POST-запроса контроллером ' + 'slide_upload'.grey);
		
		var slide = req.path_arr[1],
			form = new multiparty.Form(),
			uploadFile = {uploadPath: '', type: '', size: 0},
			maxSize = 3 * 1024 * 1024, // максимальный размер загружаемого файла
			supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'], // поддерживаемые типы файлов
			errors = [];
			
		// обработчик ошибки
		form.on('error', function(err){
			
			Log.warn('ошибка ' + err.toString());
			
			if(fs.existsSync(uploadFile.path)) {
				fs.unlinkSync(uploadFile.path);
			}
			
		});
		
		// обработчик завершения загрузки
		form.on('close', function() {
			
			// Log.view('Обработка завершения загрузки');
			
			if(errors.length == 0) {
				
				Model
					.slides.set({id : slide, img : slide + '.' + uploadFile.ext})
					.then((result) => {
						res.send({status : 'ok', path : uploadFile.path});
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			}
			else {
				if (fs.existsSync(uploadFile.path)) fs.unlinkSync(uploadFile.path);
				res.send({status: 'bad', errors: errors});
			}
		});
			
		form.on('part', function(part) {
			
			// Log.view('Обработка потока загрузки файла');
			
			uploadFile.size = part.byteCount;
			uploadFile.type = part.headers['content-type'];
			var ext_arr = part.filename.split('.');
			uploadFile.ext = ext_arr[ext_arr.length - 1];
			uploadFile.path = './public/images/slides/' + slide + '.' + uploadFile.ext;
			
			if (uploadFile.size > maxSize) {
				Log.warn('Превышен допустимый размер файла');
				errors.push('File size is ' + uploadFile.size / 1024 / 1024 + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
			}

			if (supportMimeTypes.indexOf(uploadFile.type) == -1) {
				Log.warn('Неподдерживаемый тип файла ' + uploadFile.type.grey);
				errors.push('Unsupported mimetype ' + uploadFile.type);
			}

			if (errors.length == 0) {
				
				// Log.view('Ошибок нет. Выполняется запись файла');
				
				var out = fs.createWriteStream(uploadFile.path);
				part.pipe(out);
				
			}
			else {
				part.resume();
			}
		});

		form.parse(req);	// запуск обработки формы
		
	}
	
};