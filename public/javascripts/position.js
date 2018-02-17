var Position = {
	
	showPhoto : function () {
		
		$('#main-photo')
			.attr('src', $(this).attr('src'))
			.removeClass('img-repeat')
			.removeClass('img-auto');
		
		render.renderImg();
		
	},
	
	init : () => {
		
		$('.photo').each((i, photo) => {
			$(photo).on('click', Position.showPhoto);
		});

		
	}
	
};

$(document).ready(Position.init);