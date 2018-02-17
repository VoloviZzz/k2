var fs = require('fs');

// модуль для работы с файловой системой на промисах
module.exports = {
	
	// проверка существования папки
	exists : path => {
		
		// console.log(path)
		
		return new Promise ((resolve, reject) => {
			
			fs.exists(path, (exists) => {
				resolve(exists);
			});
			
		});
		
	},
	
	// создание папки
	mkdir : path => {
		
		return new Promise ((resolve, reject) => {
			
			fs.mkdir(path, (result) => {
				
				console.log('Files.mkdir.result')
				console.log(result);
				resolve();
			
			});
			
		});
		
	},
	
	// удаление файла
	deleteFile : path => {
		
		return new Promise((resolve, reject) => {
			
			fs.unlink(path, (result) => {
				
				console.log('Files.deleteFile.result')
				console.log(result);
				resolve(result);
				
			});
			
		});
		
	}
	
};