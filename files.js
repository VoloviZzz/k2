var fs = require('fs');

// ������ ��� ������ � �������� �������� �� ��������
module.exports = {
	
	// �������� ������������� �����
	exists : path => {
		
		// console.log(path)
		
		return new Promise ((resolve, reject) => {
			
			fs.exists(path, (exists) => {
				resolve(exists);
			});
			
		});
		
	},
	
	// �������� �����
	mkdir : path => {
		
		return new Promise ((resolve, reject) => {
			
			fs.mkdir(path, (result) => {
				
				console.log('Files.mkdir.result')
				console.log(result);
				resolve();
			
			});
			
		});
		
	},
	
	// �������� �����
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