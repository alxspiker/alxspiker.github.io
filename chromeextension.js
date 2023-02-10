var buttons = document.getElementsByClassName('button-bar')[0].getElementsByTagName('a');

for( var i=0; i< buttons.length; i++ )
{
	if(buttons[i].innerHTML.trim()=="Edit Order"){
		buttons[i].href = window.location.href+"/edit";
	}else if(buttons[i].innerHTML.trim()=="Export CSV"){
		buttons[i].href = window.location.href+"/export";
	}
	var childDiv = buttons[i];
}
