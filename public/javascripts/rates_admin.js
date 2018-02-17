$(document).ready(() => {
	
	tinymce.init({
		lang:'ru',
		selector: '#edit-rates',
		menubar: false,
		toolbar: 'undo redo | removeformat | bold italic | forecolor backcolor |alignleft aligncenter alignright | bullist numlist | table',
		plugins: ['table autolink link lists wordcount code fullscreen insertdatetime save contextmenu textcolor']
	});
	
	setInterval(saveRates, 500);
	
});

function saveRates(){
	console.log('save rates')
	var text = tinyMCE.activeEditor.getContent();
	$.post(
		'',
		{ctrl:'save_rates', text:text},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}