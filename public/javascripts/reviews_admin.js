$(document).ready(() => {
	$('.edit-review-public').each((i, input) => {
		$(input).on('change', setReviewPublic);
	});
	$('.delete-review-button').each((i, button) => {
		$(button).on('click', deleteReview);
	});
});

function setReviewPublic(){
	
	
	var input = $(this);
		
	setTimeout(() => {
		
		var id = input.data('id'),
			state = input[0].checked;
		
		if (!confirm( state ? 'Опубликовать отзыв?' : 'Снять отзыв с публикции?' )) {
			
			input[0].checked = !state;
			return;
			
		}

		$.post(
			'',
			{ctrl : 'set_public', id : id, state : state ? '1' : '0'},
			data => {
				console.log(data);
				if (data !== 'complete') alert(data);
			}
		);
		
	}, 1);
	
}

function deleteReview () {
	
	var button = $(this),
		id = button.data('id');
		
	if (!confirm('Удалить отзыв')) return;
	
	console.log({ctrl : 'delete_review', id : id});
	
	$.post(
		'',
		{ctrl : 'delete_review', id : id},
		data => {
			console.log(data);
			if (data == 'complete') {
				location.reload();
			}
			else alert(data);
		}
	);
	
}