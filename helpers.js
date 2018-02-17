var ejs = require('ejs');

module.exports = {
	/* заменяет переносы строк указанным разделителем (по умолчанию '<br />') */
	replaceLineBreaks:(str, divider) => {
		
		divider = divider || '<br />';
		var res = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + divider + '$2');
		return res;
		
	},
	
	/* обрезает строку до заданной длины, (по умолчанию - 100 знаков) */
	trimStr : (str, length) => {
		
		length = length || 100;
		if (str.length > length) return str.substr(0, length - 1) + '...';
		return str;
		
	},
	
	/* рендеринг ejs-шаблона */
	renderEjsFile : (path, data) => {
		
		return new Promise((resolve, reject) => {
			
			ejs.renderFile(path, data, null, (err, str) => {
				if (err) {
					reject(err);
				}
				else {
					resolve(str);
				}
			});
			
		});
		
	}
	
}