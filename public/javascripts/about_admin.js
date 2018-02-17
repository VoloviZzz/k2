$(document).ready(() => {
	
	tinymce.init({
		lang:'ru',
		selector: '#edit-about',
		menubar: false,
		toolbar: 'undo redo | removeformat | bold italic | forecolor backcolor |alignleft aligncenter alignright | bullist numlist | table',
		plugins: ['table autolink link lists wordcount code fullscreen insertdatetime save contextmenu textcolor']
	});
	
	setInterval(saveAbout, 500);
	
});

function saveAbout(){
	var text = tinyMCE.activeEditor.getContent();
	$.post(
		'',
		{ctrl:'save_about', text:text},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}