$(document).ready(function() {

//�{�^���̃N���X�w��@���ꂪ[ul#fnt-s]�ɒǉ�����܂�
	var b_select = 'b_select';	//��{�^��
	var m_select = 'm_select';	//���{�^��
//�{�^���̃N���X�w�肱���܂�

//�t�H���g�T�C�Y�w��
	var b_font = '15px';	//��(#big)
	var m_font = '13px';		//��(#mid)

//�t�H���g�T�C�Y�w�肱���܂�

	$("ul#fnt-s").attr({"class":$.cookie('selectsize')});
	$("body").css("font-size",$.cookie('fontsize'));

	$("#big").click(function(){
		$("ul#fnt-s").addClass("b_select",b_select);
		$("ul#fnt-s").removeClass("m_select");
		$.cookie("selectsize",b_select,{ path: '/', expires: 3});
		return false;
	})

	$('#big').click(function()
	{
	$("body").css("font-size",b_font);
	$.cookie("fontsize",b_font,{ path: '/', expires: 3});
		return false;
	}
);
	$("#mid").click(function(){
		$("ul#fnt-s").addClass("m_select",m_select);
		$("ul#fnt-s").removeClass("b_select");
		$.cookie("selectsize",m_select,{ path: '/', expires: 3});
		return false;
	})

	$('#mid').click(function()
	{
		$("body").css("font-size",m_font);
		$.cookie("fontsize",m_font,{ path: '/', expires: 3});
	return false;
	}
);
}
);
