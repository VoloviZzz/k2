module.exports = {
	
	status : true,
	
	log : (str, color, level) => {	// 
		
		if (!Log.status) return;
		
		color =  color || false;
		level = level || 0;
		
		var
			i = 0,
			title = '',
			date = new Date(),
			options = {
				// era: 'long',
				// year: 'numeric',
				// day: 'numeric',
				// month: '2-digit',
				// weekday: 'long',
				timezone: 'UTC',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			};
				
		while (i < level) {	// набор отступа от левого края из дефисов с величиной, равной уровню логгирования
			
			title += '___';
			i++;
			
		}	
		
		// добавление штампа времени
		title += (date.toLocaleString("ru", options) + ': ');
		
		// установка цвета строки
		if (color) title = title[color];
		
		// собственно вывод строки в консоль
		console.log(title + str);
		// console.log('');
	},
	
	warn : (str, level) => {	// сообщение красного цвета, используется для вывода ошибок
		
		level = level || 0;
		Log.log(str, 'red', level);
	},
	view : (str, level) => {	// сообщения желтого цвета, используются для вывода информационных сообщений
		
		level = level || 0;
		Log.log(str, 'yellow', level);
	},
	data : (str, level) => {	// сообщения зеленого цвета, используются для вывода данных
		
		level = level || 0;
		Log.log(str.green, 'green', level);
	
	},
	
	delim : () => {
		console.log('--- --- --- --- --- --- --- --- --- --- --- --- --- ---'.green);
	}
};