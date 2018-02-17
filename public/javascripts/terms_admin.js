$(document).ready(() => {
	
	tinymce.init({
		lang:'ru',
		selector: '#edit-terms',
		menubar: false,
		toolbar: 'undo redo | removeformat | bold italic | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table',
		plugins: ['table autolink link lists wordcount code fullscreen insertdatetime save contextmenu textcolor']
	});
	
	setInterval(saveTerms, 500);
	
});

function saveTerms(){
	var text = tinyMCE.activeEditor.getContent();
	$.post(
		'',
		{ctrl:'save_terms', text:text},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}