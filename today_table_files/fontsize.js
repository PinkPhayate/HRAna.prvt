$(document).ready(function() {

//ボタンのクラス指定　これが[ul#fnt-s]に追加されます
	var b_select = 'b_select';	//大ボタン
	var m_select = 'm_select';	//中ボタン
//ボタンのクラス指定ここまで

//フォントサイズ指定
	var b_font = '15px';	//大(#big)
	var m_font = '13px';		//中(#mid)

//フォントサイズ指定ここまで

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
