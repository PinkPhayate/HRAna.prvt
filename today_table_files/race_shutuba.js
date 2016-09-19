
function RegMyMark(seq,umano)
{
    if (_shutuba_auth_flg==false) return;
	var mark_val;
	var mark = $('#'+seq).attr('value');
	switch(mark)
	{
	case "0":
		mark_val=0;
		break;
	case "1":
		mark_val=1;
		break;
	case "2":
		mark_val=2;
		break;
	case "3":
		mark_val=3;
		break;
	case "4":
		mark_val=4;
		break;
	case "5":
		mark_val=5;
		break;
	case "6":
		mark_val=99;
		break;
	}

	if('0' == mark_val)
	{
    	update_cart_checkbox(_shutuba_cart_group, seq, umano+'_'+mark_val, 'remove');
	}
	else
	{
    	update_cart_checkbox(_shutuba_cart_group, seq, umano+'_'+mark_val, 'add');
	}
}

$(document).ready(function ()
{
    //_shutuba_form = forms['shutuba'];
	//MYˆó‚Ì‰Šú’l
	cart_get_itemlist( _shutuba_cart_group, init_select_mark );
	
});

