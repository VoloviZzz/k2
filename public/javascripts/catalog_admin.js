$(document).ready(() => {
	$('#add-pos-button').on('click', addPos);
	$('.delete-pos-button').on('click', deletePos);
});

// добавление позиции
function addPos(){
	$.post(
		'',
		{ctrl:'add_pos'},
		data => {
			if(parseInt(data) == data){
				location.reload();
			}
			else alert(data);
		}
	);
}

function deletePos () {
	
	if (!confirm('Удалить позицию?')) return;
	
	var button = $(this),
		pos = button.data('pos');
	
	$.post(
		'',
		{ctrl : 'delete_pos', pos : pos},
		data => {
			if (data == 'complete') {
				location.reload();
			}
			else alert(data);
		}
	);
}